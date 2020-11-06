const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    user: { type: ObjectId, ref: 'user', require: true },
    comments: [{ type: ObjectId, ref: 'comment', default: null }],
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: ObjectId, ref: 'user', default: null },
    deletedAt: { type: Date, default: null },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("post", postSchema)