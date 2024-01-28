const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "Hiithisispragneshmayani@404#107";

router.post('/createuser', [
    body('email').isEmail(),
    body('password', "Password length should be minimum 6 characters").isLength({min: 6 })],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            location: req.body.location  
        });
        res.json({success: 'true'});
    }
    catch(err){
        console.log(err);
        res.json({success: 'false'});
    }
});  

router.post('/loginuser', async (req,res)=>{
    const email = req.body.email;
    try{
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({error: 'Invalid email!'});
        }
        const checkPass = await bcrypt.compare(req.body.password, userData.password);
        if(!checkPass){
            return res.status(400).json({error: 'Invalid Password!'});  
        }
        else{
            const data ={
                user:{
                    id: userData.id
                }
                }
                const authToken = jwt.sign(data, jwtSecret);
                return res.json({success: 'True', authToken:authToken});
        }
    }
    catch(err){
        console.log(err);
        res.json({success: 'False'});
    }
});  

module.exports = router;
