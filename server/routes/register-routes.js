const router = require('express').Router();
const User = require('../models/User-model');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check'); //form validation

passwordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash);
            })
        })
    })
}

router.post('/', [
    // username must be an email
    check('email').isEmail().withMessage('Please provide a valid email'),
    // password must be at least 8 chars long
    check('password').isLength({ min: 8 }).withMessage('Password needs to be 8 characters or longer')], async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    error: errors.array()[0].msg
                })
            }

            const { password } = req.body;
            const { email } = req.body;

            const userExists = await User.findOne({email: email})
            if(userExists){
                return res.json({
                    error: 'This user already exists'
                })
            }


            new User({
                password: await passwordHash(password),
                email: email,
                joinDate: new Date().toISOString()
            }).save().then((savedUser) => {
                //log the user in
                req.login(savedUser, () => {
                    return res.json({
                        success: true,
                        user: req.user
                    })
                })
            })

        } catch (e) {
            console.log(e)
            return res.json({
                error: 'Sorry an error occured'
            })
        }


    })

module.exports = router;