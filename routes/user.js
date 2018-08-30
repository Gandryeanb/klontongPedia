const Router = require('express').Router()
const ControllerUser = require('../controller/controllerUser')

Router.get('/',ControllerUser.userPage)
Router.post('/:id/buy',ControllerUser.userBuyPost)
Router.post('/edit',ControllerUser.userEditPost)
Router.get('/edit',ControllerUser.userEditGet)
Router.get('/:id/buy',ControllerUser.userBuyGet)
Router.get('/pendingTransaction',ControllerUser.pendingTransactionGet)
Router.get('/:id/pay',ControllerUser.pay)

module.exports = Router