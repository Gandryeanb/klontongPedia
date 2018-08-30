const Routes = require('express').Router()
const ControllerHome = require('../controller/controllerHome')
const User = require('./user')

Routes.use('/user',User)

Routes.get('/',ControllerHome.homePage)
Routes.get('/sign-up',ControllerHome.signUpGet)
Routes.post('/sign-up',ControllerHome.signUpPost)
Routes.post('/login',ControllerHome.loginPost)
Routes.get('/login',ControllerHome.loginGet)
Routes.get('/logout',ControllerHome.logout)

module.exports = Routes