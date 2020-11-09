const mongoose = require('mongoose');


/**
 * @description ROLES DEFINITION SCHEMA
 */
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("role", roleSchema)