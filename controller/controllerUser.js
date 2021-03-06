const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const User = require('../models').User
const Item = require('../models').Item
const Shop = require('../models').Shop
const imageHelper = require('../helpers/imageHelper')
const errMsgCatcher = require('../helpers/errMsgCatcher')
const Transaction = require('../models').Transaction

class ControllerUser {

    static pay (req,res) {
        Transaction.update({
            status : true
        },
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(change => {
            res.redirect('/user/pendingTransaction')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static pendingTransactionGet(req,res) {
        Transaction.findAll({
            where: {
                emailUser : req.session.user.email,
                status : false
            }
        })
        .then(datas => {
            res.render('userPendingTransaction',{datas})
        })
        .catch(err => {
            res.send(err)
        }) 
    }

    static userBuyGet(req, res) {
        Item.findOne({
            where: {
                id: req.params.id
            },
            include:{
                model:Shop
            }
        })
        .then(data => {
            res.render('userBuy',{data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static userBuyPost(req,res) {

        Transaction.create({
            addressBuyer: req.body.addressBuyer,
            status:false,
            amount: req.body.amount,    
            itemId : req.body.itemId, 
            emailUser : req.session.user.email,
            price : req.body.price * req.body.amount,
        })
        .then(change => {
            res.redirect('/user')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static userPage(req,res) {
        let session = req.session.user
        
        Item.findAll({
            where:{
                amount : {
                    [Op.gt ]: 0
                }
            },
            include:{
                model:Shop
            }
        })
        .then(itemDatas => {  
            res.render('userPage',{session,itemDatas,imageHelper})   
        })
        .catch(err => {
            res.send(err)
        })

    }

    static userEditGet(req, res, errMsg) {
        
        User.findOne({
            where:{
                id:req.session.user.id
            }
        })
        .then(data => {
            res.render('userEdit',{data, errMsg})
        })
        .catch(err =>  {
            res.send('failed')
        })
    }

    static userEditPost(req,res) {
        User.update(req.body,{
            where:{
                id:req.session.user.id
            }
        })
        .then(change => {
            if(req.session.user.firstName !== req.body.firstName) {
                req.session.user.firstName = req.body.firstName
            }
            res.redirect('/user')
        })
        .catch(err => {
            ControllerUser.userEditGet(req,res,errMsgCatcher(err))
        })
    }

}

module.exports = ControllerUser