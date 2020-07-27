module.exports = {

    async getOrderByPk(orderId, t) { 
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

        return order
    },

    
    async updateStockQuantity( data, action, transaction ){

        const { product, quantity, order } = data

        let description = ''
        if(action === 'decrease'){
            if(product.stockQuantity < quantity || product.stockQuantity <= 0) {
                throw `Error on creating order! Stock is less than quantity! Product: ${product.name}. Stock: ${product.stockQuantity}.`
            } else { 
                product.decrement('stockQuantity', { by: quantity, transaction })
        
                description = `${product.name} - stock reduced in ${quantity}: from ${product.stockQuantity + quantity} to ${product.stockQuantity} units.`
            }

        } else { 
            product.increment('stockQuantity', { by: quantity, transaction })
                                        
            description = `${product.name} - stock increased in ${quantity}: from ${product.stockQuantity - quantity} to ${product.stockQuantity} units.`
        }

        console.log('Result from Update Stock', description)
        return await order.createOrderHistory({ description }, { transaction })
    },


    async updatePaymentStatus(order, orderStatus, paymentId, note, transaction) { 
            
        const newStatus = await OrderStatus.findOne({ 
            where: { 
                paid: true
            }, 
            transaction
        })
        
        order.statusId = newStatus.id
        order.paid = true
        order.paymentId = paymentId

        if(note !== '')
            await order.createOrderHistory({ note }, { transaction })

        const description = `Status changed from ${orderStatus.name} to ${newStatus.name}`
        console.log('DESCRIPTION', description)
        return await order.createOrderHistory({ description }, { transaction })
    },

    
    async updateStatus(order, orderStatus, newStatus, note, transaction) { 

        //Analysis Status - If changes from or to, needs to fill notes
        if(orderStatus.analysis || newStatus.analysis) {
            if(!note || note === '') 
                if(orderStatus.analysis) throw 'Need to fill notes to change from Analysis!'
                else throw 'Need to fill notes to change to Analysis!'

        //Cancelled Status, needs to fill Note - If changes to or from Cancelled Status, needs to fill Note
        } else if(orderStatus.cancelled || newStatus.cancelled) {
            if(orderStatus.cancelled && !newStatus.init) throw 'Can only change to init status!'
            
            if(note === '')
                if(orderStatus.cancelled) throw 'Need to fill notes to change from Cancelled!'
                else throw 'Need to fill notes to change to Cancelled!'


            const orderProductsId = order.OrderProducts.map(product => product.productId )
            const products = await Product.findAll({
                where: { 
                    id: { [Op.in]: orderProductsId }
                }, transaction
            })

            //If is cancelling, returns item to stock; Or subtract if recovering
            const action = orderStatus.cancelled ? 'decrease' : 'increase'
            for(product of products) { 
                const orderProduct = order.OrderProducts.find(orderProduct => product.id === orderProduct.productId )

                console.log('PRODUCT :', product.id, product.stockQuantity)
                console.log('ORDER PRODUCT :', orderProduct.productId, orderProduct.productQuantity)

                await updateStockQuantity({ 
                    order, 
                    product, 
                    quantity: orderProduct.productQuantity 
                }, action, transaction )
            }   

        //Finished Status - If changes from Finished, needs to fill Note
        } else if(orderStatus.finished || newStatus.finished) { 
            if(newStatus.finished)
                if(!order.paid || !order.paymentId) throw 'Needs payment Id to change to this status!'
            
            if(orderStatus.finished)
                if(!note || note === '') throw 'Need to fill notes to change from Finished!'
        
        //Init Status - If changes form Init status, needs paymentId
        } else if (orderStatus.init) { 

            if(!order.paid || !order.paymentId) throw 'Needs payment Id to change from this status!'
        }

        order.statusId = newStatus.id

        if(note || note !== '')
            await order.createOrderHistory({ note }, { transaction })

        const description = `Status changed from ${orderStatus.name} to ${newStatus.name}`
        return await order.createOrderHistory({ description }, { transaction })
    }
}