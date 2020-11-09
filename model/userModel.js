const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")



/**
 * @description USER MODEL SCHEMA FOR USERS WITH VALIDATION
 */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add First Name'],
        maxlength: [28, 'First name should be less than 28 characters'],
        minlength: [2, 'First name should be more than 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please add Last Name'],
        maxlength: [28, 'Last name should be less than 28 characters'],
        minlength: [2, 'Last name should be more than 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add email address'],
        unique: [true, 'Email id should be unique'],
        match: [
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            , 'Please add valid email addresss'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add password'],
        default: null,
        maxlength: [28, 'Password should be less than 28 characters'],
        minlength: [8, 'Password should be more than 8 characters'],
        match: [
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            'Password should contain atleast one character number and special character'
        ]
    },
    role: {
        type: ObjectId,
        ref: "role",
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    })




/**
 * @description PRE HOOK FOR BCRYPT FOR HASHING PASSWORD
 */
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})



/**
 * @description METHOD FOR MODEL, SIGN JWT AND RETURN 
 */
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, role: "Users" }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


/**
 * @description METHOD FOR MODEL, COMPARE PASSWORDS
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model("user", userSchema)