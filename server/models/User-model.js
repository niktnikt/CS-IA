const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: String,
    email: String,
    joinDate: String
})
//method to check if password is correct
userSchema.methods.validatePassword = function(password){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password).then((res) => {
            //password is the password typed by user this.password is the users password saved in DB
            resolve(res)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User;