const User= require('../models').User
const errMsgCatcher = require('../helpers/errMsgCatcher')
class ControllerHome {
    
    static homePage(req,res) {
        if (req.session.user) {
            let user = req.session.user
            res.render('home', {user})
        } else {
            let user = {
                id : null,
                email : null,
                firstName : 'Guest'
            }
            res.render('home',{user})
        }
    }

    static signUpGet(req,res,errMsg) {
        res.render('sign-Up',{errMsg})
    }

    static signUpPost(req,res) {
        User.create(req.body)
        .then(change => {
            res.redirect('/')
        })
        .catch(err => {
            ControllerHome.signUpGet(req,res, errMsgCatcher(err))
        })
    }

    static loginGet (req, res, errMsg) {
        res.render('login',{errMsg})
    }

    static loginPost( req, res) {
        User.findAll({
            where:{
                username: req.body.username,
                password: req.body.password
            }
        })
        .then(data => {
            if (data.length === 0) {
                ControllerHome.loginGet(req,res, ['wrong username or password!'])    
            } else {
                let sessionPacker = {
                    id: data[0].dataValues.id,
                    email: data[0].dataValues.email,
                    firstName: data[0].dataValues.firstName
                }
                req.session.user = sessionPacker
                res.redirect('/')
            }
        })
        .catch(err => {
            ControllerHome.loginGet(req,res, errMsgCatcher(err))
        })
    }

    static logout(req,res) {
        req.session.user = null
        res.redirect('/')
    }

}

module.exports = ControllerHome