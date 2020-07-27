const multer = require('multer') //Responsavel por upload de Multifiles
const path = require('path') //Formata o caminho do disco com / ou \ de acordo com o SO
const fs = require('fs-extra')


const env = process.env.NODE_ENV === 'test' ? '__tests__' : 'public'

function createDir(dir) { 
    const exists = fs.pathExistsSync(dir)
    if(!exists)
        fs.mkdirSync(dir, { recursive: true }) 
}

function multerConfig() {
    
    return (
        {
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    const { category } = req.params
                    const dir = path.resolve(__dirname, '..', '..', env, 'images', category)
                    
                    createDir(dir)

                    cb(null, dir)
                }, 

                filename: (req, file, cb) => {

                    const ext = path.extname(file.originalname) //Pega a extensão do arquivo
                    const name = file.originalname.split('.').slice(0, -1).join('.')

                    cb(null, `${name}-${Date.now()}${ext}`)
                }
            }),

            fileFilter: function (req, file, cb) {

                if (
                    file.mimetype !== 'image/png' && 
                    file.mimetype !== 'image/jpg' &&
                    file.mimetype !== 'image/jpeg'
                ) {
                    req.error = 'Invalid mymetype'
                    return cb(null, false, new Error('I don\'t have a clue!'));
                }
                cb(null, true);
            }
        })
 }
 
 module.exports = multerConfig