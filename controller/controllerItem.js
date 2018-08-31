const Item = require('../models').Item
const dateReader = require('../helpers/dateReader')
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
            res.render('historyItem',{datas,dateReader})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static chart(req,res) {
        Transaction.findAll({
            where: {
                emailUser:req.session.user.email,
                status: true, 
            },

            include:{
                model:Item
            }
        })
        .then(datas => {
            let dataName = []
            let dataProfit = []

            for (let i = 0; i < datas.length; i++) {
                if(dataName.length == 0) {
                    dataName.push(datas[i].dataValues.Item.name)
                    dataProfit.push(datas[i].dataValues.price)
                } else {
                    let already = false
                    let index;
                    for (let j = 0; j < dataName.length; j++) {
                        if (datas[i].dataValues.Item.name == dataName[j]) {
                            already = true
                            index = j
                        }
                    }
                    if (!already) {
                        dataName.push(datas[i].dataValues.Item.name)
                        dataProfit.push(datas[i].dataValues.price)
                    } else {
                        dataProfit[index] += datas[i].dataValues.price
                    }
                }
            }
            
            // for (let i = 0; i < datas.length; i++) {
            //     dataName.push(datas[i].dataValues.Item.name)
            //     dataSold.push(datas[i].dataValues.amount)
            // }
            // res.send(datas)
            console.log(dataName);
            console.log(dataProfit)

            let dataChart = {
                labels: dataName,
                datasets: [{
                    label: 'Total Profit per Item',
                    data: dataProfit,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ] ,
                    borderWidth: 1
                }]
            } 
            
            res.render('chart',{dataChart})
        })
        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = ControllerItem