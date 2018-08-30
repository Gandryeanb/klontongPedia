const Routes = require('express').Router()
const ControllerItem = require('../controller/controllerItem')

Routes.post('/add',ControllerItem.addItemPost)
Routes.get('/add',ControllerItem.addItemGet)
Routes.get('/history',ControllerItem.ItemSold)

module.exports = Routes