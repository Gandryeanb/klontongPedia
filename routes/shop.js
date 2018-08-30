const Routes = require('express').Router()
const ControllerShop = require('../controller/controllerShop')
const Shop = require('../models').Shop


Routes.get('/',ControllerShop.shopPage)
Routes.get('/createShop',ControllerShop.shopCreateGet)
Routes.post('/createShop',ControllerShop.shopCreatePost)




module.exports = Routes