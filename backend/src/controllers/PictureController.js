const Picture = require('../models/Picture')
const path = require('path')
const fs = require('fs')

module.exports = {
    async index(req, res) {
        
        const pictures = await Picture.findAll({})

        return res.json(pictures)
    },

    async store(req, res) { 
        try { 
            if(req.error) throw 'Invalid mymetype!'

            const { 
                name,
                description
            } = req.body

            const { category } = req.params
            
            const { path } = req.file

            const url = path.substr(15)

            const picture = await Picture.create({ 
                name,
                description,
                category,
                filePath: path,
                url
            })

            return res.status(200).json(picture)
    
        } catch(err) { 
            return res.status(400).json({ error: err })
        }
    },

    async destroy(req, res) {
        try { 
            const { pictureId } = req.params

            const picture = await Picture.findByPk(pictureId)
            if(!picture) throw 'Picture not found!'
               
            const exists = fs.existsSync(picture.filePath)
            // if(!exists) throw 'Picture path not found! '
    
            fs.unlink(picture.filePath, () => {
                console.log('Picture removed')  
            })
    
            await picture.destroy()
    
            return res.status(200).json({ message: 'Picture deleted!' })
        } catch(err) { 
            return res.status(400).json({ error: 'Picture removed!' })
        }
        
        
    }
}