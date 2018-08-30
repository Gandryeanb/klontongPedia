const Routes = require('express').Router()
const ControllerHome = require('../controller/controllerHome')
const User = require('./user')
const Shop = require('./shop')
const Item = require('./item')


Routes.use('/user',(req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
})

Routes.use('/shop',(req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
})

Routes.use('/item',(req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
})

Routes.use('/user',User)
Routes.use('/shop',Shop)
Routes.use('/item',Item)

Routes.get('/',ControllerHome.homePage)
Routes.get('/sign-up',ControllerHome.signUpGet)
Routes.post('/sign-up',ControllerHome.signUpPost)
Routes.post('/login',ControllerHome.loginPost)
Routes.get('/login',ControllerHome.loginGet)
Routes.get('/logout',ControllerHome.logout)

module.exports = Routes