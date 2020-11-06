const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    message: { type: String, require: true },
    user: { type: ObjectId, ref: 'user', default: null },
    post: { type: ObjectId, ref: 'post', default: null },
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: ObjectId, ref: 'user', default: null },
    deletedAt: { type: Date, default: null },
},
    {
        timestamps: true
    })

module.exports = mongoose.model("comment", commentSchema)