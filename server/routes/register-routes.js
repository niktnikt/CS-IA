const router = require('express').Router();
const User = require('../models/User-model');
const bcrypt = require('bcryptjs');

passwordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash);
            })
        })
    })
}

router.post('/', async (req, res) => {
    try{
        const {password} = req.body;
        const {email} = req.body;

        
        new User({
            password: await passwordHash(password),
            email: email,
            joinDate: new Date().toISOString()
        }).save().then((savedUser) => {
            //log the user in
            req.login(savedUser, () => {
                return res.json({
                    success: true
                })
            })
        })
    
    }catch(e){
        console.log(e)
        return res.json({
            error: 'Sorry an error occured'
        })
    }


})

module.exports = router;