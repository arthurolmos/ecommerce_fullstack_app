const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('./config/passport')
const passportAuth = require('./middlewares/passportAuth')
const { errors } = require('celebrate')
const routes = require('./routes') 


require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

// require('./config/redis')
require('./database')


const app = express()


app.use(cors())
app.use(express.json())
// app.use('/public/images/products', express.static(path.resolve(__dirname, '..', 'public', 'images', 'products')))
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(passport.initialize())
// app.use(passportAuth.unless({ 
//     path: ['/login', '/register', '/logout' ] 
// }))
app.use(routes)
app.use(function(err, req, res, next) { 
    console.log('IM HERE')
    if(err) { 
        console.log('ERROR', err)
    }
})

module.exports = app