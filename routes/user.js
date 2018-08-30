const Router = require('express').Router()
const ControllerUser = require('../controller/controllerUser')

Router.get('/',ControllerUser.userPage)

module.exports = Router