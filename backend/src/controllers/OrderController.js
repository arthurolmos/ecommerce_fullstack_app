const { connection:sequelize } = require('../database')
const { Op } = require('sequelize')

const User = require('../models/User')
const Address = require('../models/Address')
const Order = require('../models/Order')
const OrderStatus = require('../models/OrderStatus')
const Product = require('../models/Product')
const OrderProduct = require('../models/OrderProduct')
const OrderNote = require('../models/OrderNote')
const OrderAddress = require('../models/OrderAddress')

const repository = require('../repositories/order/OrderRepository')

const formatOrderNotes = require('../../src/utils/formatOrderNotes')



module.exports = {
    async index(req, res) {

        const orders = await Order.findAll(
            { 
                attributes: {
                    exclude: ['userId', 'statusId']
                },
                include: [
                    {
                        model: OrderProduct,
                        attributes: {
                            exclude: ['productId', 'orderId']
                        },
                        include: { model: Product }
                    },
                    { association: 'user' },
                    { association: 'orderAddress' },
                    { association: 'orderStatus' },
                    { association: 'orderNotes' },
                    { association: 'orderHistories' }
                ]
            }
        )

        return res.status(200).json(orders)
    },



    async store(req, res) {
        try{ 

            const { user_id } = req.headers

            const { 
                totalPrice,
                shipping,
                note = '',
                items,
                addressId
            } = req.body

            console.log('HERE', req.headers)

            if(items.length <= 0) throw 'Order without products!'
            
            const result = await sequelize.transaction( async t => {
    
                //Gets MAX Order number
                let orderNumber = await Order.max('orderNumber', { transaction: t })
                orderNumber++

                //Finds the status with 'INIT'
                const status = await OrderStatus.findOne(
                        { 
                            where: { init: true },
                            attributes: ['id']
                        },  
                        { transaction: t }
                )
                console.log('DATA', 
                        orderNumber,
                        items.length,
                        totalPrice,
                        user_id,
                        status.id,
                        addressId
                )

                //Creates the Order
                const order = await Order.create(
                    {
                        orderNumber,
                        totalItems: items.length,
                        totalPrice,
                        deleted: false,
                        userId: user_id,
                        statusId: status.id
                    }, { transaction: t }
                )

                //Find the Address for the Order
                const address = await Address.findOne({
                    where: { 
                        id: addressId,
                        userId: user_id
                    }
                })
                if(!address) throw 'Address not found!'

                //Creates Order Address
                const orderAddress = await order.createOrderAddress({
                    street: address.street,
                    number: address.number,
                    complement: address.complement,
                    neighborhood: address.neighborhood,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode
                }, { transaction: t })

                // //Gets all Products Id and find them all
                // const productsId = await items.map(item => item.id)
                // const products = await Product.findAll({
                //         where: { 
                //             id: { [Op.in]: productsId } 
                //         }
                //     }, { transaction: t }
                // )
                // console.log('PRODUCTS', products)

                //Creates Order Products
                const orderProducts = []
                for(item of items) {
    
                    const { id, quantity, note = '' } = item
    
                    // const product = products.find(product => { 
                    //     return product.id === id 
                    // })
                    const product = await Product.findByPk(id, { transaction: t })
                    if(!product) throw 'Error on creating order! Product not found!'
    
                    //Checks the Stock Quantity
                    await repository.updateStockQuantity({ order, product, quantity }, 'decrement', t )
    
                    // const { color, size, price } = product

                    const productNotes = formatOrderNotes(note)
    
                    product.OrderProduct = {
                        orderNumber,
                        productQuantity: quantity,
                        productDiscount: 0,
                        productTotalPrice: product.price,
                        notes: productNotes
                    } 

                    console.log('PRODUCT', product)
                    console.log('ORDER PRODUCT', product.OrderProduct)

                    orderProducts.push(product)
                }
    
                console.log('ORDERPRODUCTS', orderProducts)
                await order.addProducts(orderProducts, { transaction: t })

                console.log('HEREEE MOFO')
                //Creates an Note for the Order
                if(note !== '' ) 
                    await order.createOrderNote({ note }, { transaction: t })

                //Creates the Order History
                const description = `Pedido criado!`
                await order.createOrderHistory({ description }, { transaction: t })

                return order
            })
            
            return res.status(200).json(result)

        } catch(err) { 
            return res.status(400).json({ error: err })
        }
    },


    async update(req, res) {

        const { orderId } = req.params

        const { 
            paid,
            paymentId,
            status,
            updStatus = false,
            note = ''
        } = req.body

        try {
            const result = await sequelize.transaction( async t => {

                //Finds the Order
                const order = await Order.findOne({
                    where: {
                        id: orderId
                    },
                    include: [
                        {
                            model: OrderProduct,
                            include: { model: Product }
                        }
                    ],
                    transaction: t
                })
                if(!order) throw 'Order not found!'

                //Gets Order Status
                const orderStatus = await OrderStatus.findOne(
                    { where: { 
                        id: order.statusId 
                    }, 
                    transaction: t 
                })
                if(!orderStatus) throw 'Order status not found!'

                //If is updating Status...
                if(updStatus) { 
                    //If is updating to Paid 
                    if(paid){
                        if(!paymentId) throw 'Needs to fill payment Id!'
                        
                        if(!orderStatus.init) throw 'Can only be paid after Init Status'
                        
                        await repository.updatePaymentStatus(order, orderStatus, paymentId, note, t)

                    //If is updating to another Status...
                    } else { 

                        const newStatus = await OrderStatus.findOne({ 
                            where: { 
                                id: status.id
                            }, 
                            transaction: t 
                        })
                        if(!newStatus) throw 'New status not found!'

                        //If status changed...
                        if(newStatus.id !== orderStatus.id) {
                            await repository.updateStatus(order, orderStatus, newStatus, note, t)
                        }
                    }
                }

                if(note !== '' ) 
                    await order.createOrderNote({ note }, { transaction: t })

                await order.save({ transaction: t })

                return order
            })
            
            return res.status(200).json(result)

        } catch(err) {
            return res.status(400).json({ error: err })
        }
    },

    async query(req, res) {

        const { orderId } = req.params
        console.log(orderId)

        const order = await Order.findByPk(orderId, 
            {
            attributes: {
                exclude: ['userId', 'statusId']
            },
            include: [
                {
                    model: OrderProduct,
                    attributes: {
                        exclude: ['productId', 'orderId']
                    },
                    include: { model: Product }
                },
                { association: 'user' },
                { association: 'orderAddress' },
                { association: 'orderStatus' },
                { association: 'orderNotes' },
                { association: 'orderHistories' }
            ]
        })

        return res.status(200).json(order)
    },

    async destroy(req, res) {

        const { orderId } = req.params
        
        await Order.destroy({
            where: { id: orderId }
        })

        return res.status(200).send('Deleted!')
    }
}