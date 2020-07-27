const OrderStatus = require('../models/OrderStatus')

module.exports = {
    async index(req, res) {

        const resp = await OrderStatus.findAll()

        return res.status(200).json(resp)
    },

    async store(req, res) {

        const { 
            name, 
            init = false, 
            analysis = false, 
            cancelled = false,
            finished = false,
            delivery = false,
            payment = false 
        } = req.body

        try {
            if(init && analysis && cancelled && finished && payment && delivery) throw 'Choose only one type!'

            let order = await OrderStatus.findOne({ where: { name: name } })
            if(order) throw 'Status with same name already exists!'

            order = await OrderStatus.create({ 
                                        name, 
                                        init,
                                        analysis, 
                                        cancelled,
                                        finished,
                                        delivery,
                                        payment 
                                    })

            return res.status(200).json(order)

        } catch(err) {
            return res.status(400).json({ error: err })
        }
    },

    async destroy(req, res) { 

        const { status_id } = req.params

        try { 
            await OrderStatus.destroy({ where: {id: status_id } })

            return res.status(200).json({ message: 'Deleted!' })
            
        }catch(err) {
            return res.status(400).json({ error: err })
        }

    }
}