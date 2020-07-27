const { Router } = require('express')
const path = require('path')
const multer = require('multer')
const passport = require('./config/passport')

const celebrate = require('./config/celebrate')
const multerConfig = require('./config/multer')

//Controllers
const AuthController = require('./controllers/AuthController')

const UserController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController')
const HomeController = require('./controllers/HomeController')
const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/CategoryController')
const PictureController = require('./controllers/PictureController')
const OrderController = require('./controllers/OrderController')
const OrderStatusController = require('./controllers/OrderStatusController')

//Multer
const upload = multer(multerConfig())

//Routes
const routes = Router() 

routes.get('/login',   function(req, res) { return res.send('HELLO LOGIN') })
routes.post('/login', AuthController.login) 
routes.post('/logout', AuthController.logout) 
routes.post('/register', AuthController.register)

routes.get('/home',  function(req, res) { 
    return res.send('HELLO')
})

routes.get('/users', UserController.index)
routes.get('/users/:userId', UserController.query)
routes.post('/users', UserController.store)
routes.put('/users/:userId', UserController.update)
routes.delete('/users/:userId', UserController.destroy)

routes.get('/users/:userId/addresses', AddressController.index)
routes.post('/users/:userId/addresses', AddressController.store)
// routes.put('/users/:userId/addresses/:addressId', AddressController.update)
// routes.delete('/users/:userId/addresses/:addressId', AddressController.destroy)

routes.get('/addresses', AddressController.index)

routes.get('/products', ProductController.index)
routes.get('/products/:productId', ProductController.query)
routes.post('/products', ProductController.store)
routes.put('/products/:productId', ProductController.update)
routes.delete('/products/:productId', ProductController.destroy)
routes.delete('/products', ProductController.destroyAll)


routes.get('/categories', CategoryController.index)
routes.get('/categories/:categoryId', CategoryController.query)
routes.post('/categories', CategoryController.store)
routes.put('/categories/:categoryId', CategoryController.update)
routes.delete('/categories/:categoryId', CategoryController.destroy)

routes.get('/pictures', PictureController.index)
routes.post('/pictures/:category', upload.single('img'), PictureController.store)
routes.delete('/pictures/:pictureId', PictureController.destroy)

routes.get('/orders', OrderController.index)
routes.get('/orders/:orderId', OrderController.query)
routes.post('/orders', OrderController.store)
routes.put('/orders/:orderId', OrderController.update )
routes.delete('/orders/:orderId', OrderController.destroy)


routes.get('/orders_status', OrderStatusController.index)
routes.post('/orders_status', OrderStatusController.store)
routes.delete('/orders_status/:statusId', OrderStatusController.destroy)

module.exports = routes