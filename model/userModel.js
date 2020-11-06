const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    role: { type: ObjectId, ref: "role", default: null },
    isDeleted: { type: Boolean, default: false },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("user", userSchema)