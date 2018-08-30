const Item = require('../models').Item
const Transaction = require('../models').Transaction

class ControllerItem {

    static addItemPost (req,res) {
        Item.create({
            name:req.body.itemName,
            imageLink:req.body.linkImage,
            amount: req.body.amount,
            shopId: req.session.user.shopId,
            price: req.body.price
        }) 
        .then(change => {
            res.redirect('/shop')
        })
        .catch(err => {
            res.send(err)
        })       
    }

    static addItemGet (req, res) {
        res.render('shopAdd')
    }

    static ItemSold(req, res) {
        Transaction.findAll({
            where: {
                emailUser:req.session.user.email,
                status: true
            },
            include:{
                model:Item
            }
        })
        .then(datas => {
            // res.send(datas)
            res.render('historyItem',{datas})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ControllerItem