const express = require('express');
const orders = require('../models/orders');
const router = express.Router();

router.post('/orderData', async (req, res) => {
    let data = req.body.orderData;
    // console.log(data);
    await data.splice(0, 0, { Order_date: req.body.date })
    let eid = await orders.findOne({ 'email': req.body.email });
    if (eid === null) {
        try {
            await orders.create({
                email: req.body.email,
                orderData: [data]
            }).then(() => {
                res.status(200).json({ success: true })
            })
        }
        catch (error) {
            console.log(error.message)
            res.send("server error!!!", error.message);
        }
    }
    else {
        try {
            await orders.findOneAndUpdate({ email: req.body.email },
                { $push: { orderData: data } })
                .then(() => {
                    res.status(200).json({ success: true })  
                })
        }
        catch (error) {
            res.send("server error!!!", error.message)
        }
    }
});

router.post('/myOrderData', async(req,res)=>{
   try {
        let data =  await orders.findOne({'email': req.body.email});
        res.json({myOrderData: data});
   } catch (error) {
        res.send("server error!!!", error.message)
   }

});

module.exports = router;  