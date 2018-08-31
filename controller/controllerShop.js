const Shop = require('../models').Shop
const Item = require('../models').Item
const imageHelper = require('../helpers/imageHelper')

class ControllerShop {

    static shopPage(req,res) {
        let shopName;
        Shop.findAll({
            where:{
                emailUser: req.session.user.email
            }
            
        },{raw:true})
        .then(datas => {
            shopName = datas[0].name
            if (datas.length > 0) { 
                
                req.session.user.shopId = datas[0].id
                return Item.findAll({
                    where:{
                        shopId:datas[0].id
                    }
                })
            } else {
                res.redirect('/shop/createshop')
            }
        })
        .then(itemDatas => {
            // res.send(shopName)
            res.render('shop',{itemDatas,imageHelper,shopName})
        })
    }

    static shopCreateGet(req, res) {
        let email = req.session.user.email
        res.render('userCreateShop', {email})
    }

    static shopCreatePost(req, res) {

        Shop.create({
            name:req.body.shopName,
            emailUser:req.session.user.email
        })
        .then(change => {
            
            res.send('berhasil')
        })
        .err(err => {
            res.send(err)
        })
    }

}

module.exports = ControllerShop