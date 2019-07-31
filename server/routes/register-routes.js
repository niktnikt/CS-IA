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
    check('password').isLength({ min: 8 }).withMessage('Password needs to be 8 characters or longer'),
    check('name').isAlpha().withMessage('Name must contain only alphabetical characters'),
    check('surname').isAlpha().withMessage('Surname must contain only alphabetical characters'),
    check('city').isAlpha().withMessage('City must contain only alphabetical characters'),
    check('street').isAlpha().withMessage('Street must contain only alphabetical characters'),
    check('number').isAlphanumeric().withMessage('Name must contain only alphabetical and numerical characters')
], async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    error: errors.array()[0].msg
                })
            }

            const { password, email, name, surname, city, street, number } = req.body;

            const userExists = await User.findOne({email: email})
            if(userExists){
                return res.json({
                    error: 'This user already exists'
                })
            }


            new User({
                password: await passwordHash(password),
                email: email,
                joinDate: new Date().toISOString(),
                name: name,
                surname: surname,
                address: {
                    city: city,
                    street: street,
                    number: number
                }
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