const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const POST = require("../model/connection").post

const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Please add message'],
        maxlength: [300, 'Message should be less than 300 characters'],
        minlength: [12, 'Message should be more than 12 characters']
    },
    user: {
        type: ObjectId,
        ref: 'user',
        default: null
    },
    post: {
        type: ObjectId,
        ref: 'post',
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: ObjectId,
        ref: 'user',
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    },
},
    {
        timestamps: true
    })



/**
 * @description COMMENTS ADDED TO RESPECTIVE POST 
 */
commentSchema.post('create', async function (next) {
    console.log(`comments being added to post ${this.post}`)
    const point = await POST.findById(req.params.postid)
    const updated = await POST.findByIdAndUpdate(req.params.postid, { comments: point.comments.push(comment._id) })
    next()
})



// commentSchema.post('findOneAndUpdate', async function (next) {
//     let point = await POST.findById(req.params.postid)
//     point = point.comments.pop(comment._id)
//     console.log("post data" + point)
//     point.update()
//     console.log(main)
//     next()
// })



module.exports = mongoose.model("comment", commentSchema)