var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

var UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Имэйл хаягаа оруулна уу'],
            unique: [true, 'Бүртгэлтэй хаяг байна'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Имэйл хаяг буруу байна'
            ]
        },
        username: {
            type: String,
            required: [true, 'Нэрээ оруулна уу'],
        },
        password: {
            type: String,
            required: [true, 'Нууц үгээ оруулна уу'],
            select: false
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
        role: {
            type: String,
            enum: ["Teacher", "Admin"],
            default: "Teacher",
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
  );

UserSchema.plugin(mongoosePaginate)

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.getJWT = function () {
    const token = jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    return token
}

UserSchema.methods.checkPassword = async function (entrypwd) {
    return await bcrypt.compare(entrypwd, this.password);
}

//Export model
module.exports = mongoose.model('User', UserSchema);