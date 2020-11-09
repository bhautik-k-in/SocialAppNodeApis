const mongoose = require("mongoose")
const slugify = require("slugify")
const ObjectId = mongoose.Schema.Types.ObjectId



/**
* @description POST MODEL SCHEMA FOR COMMENT ENTRY WITH VALIDATION
*/
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add title'],
        unique: true,
        trim: true,
        maxlength: [50, 'Title should be less than 50 characters'],
        minlength: [4, 'Title should be more than 4 characters']
    },
    slug: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: [true, 'Please add descrtiption'],
        maxlength: [500, 'Description should be less than 500 characters'],
        minlength: [4, 'Description should be more than 4 characters']
    },
    user: {
        type: ObjectId,
        ref: 'user',
        default: null
    },
    comments: [{
        type: ObjectId,
        ref: 'comment',
        default: null
    }],
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
}, {
    timestamps: true
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)



/**
 * @description PRE HOOK FOR SLUG THE TITLE FIELD FOR BETTER READABLE RESPONSE / ALSO FOR SEO PURPOSE
 */
postSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next()
})



/**
 * @description FOR SLUG THE TITLE FIELD FOR BETTER READABLE RESPONSE / UPDATE
 * @todo HOW TO UPDATE SLUG ALSO ON METHOD findOneAndUpdate => reason. This methods not working on pre post hooks
 */
postSchema.pre('findOneAndUpdate', true, function (next) {
    console.log("called")
    this.slug = slugify(this.title, { lower: true })
    next()
})



/**
 * @description PRE HOOK FOR CASCADE DELETE OF COMMENTS WITH POST
 * @todo WHY REMOVE ONLY WORKS
 */
// postSchema.pre('findByIdAndUpdate', async function (next) {
//     console.log(`Comments being removed from post ${this._id}`.red)
//     await this.model('comment').updateMany({ isDeleted: true, post: this._id })
//     next()
// })


/**
 * @description VIRTUALS FOR DISPLAY INSIDE DATA OF ALL COMMENTS
 */
// postSchema.virtual('commentsOnPost', {
//     ref: 'comment',
//     localField: '_id',
//     foreignField: 'post',
//     justOne: false
// })



module.exports = mongoose.model("post", postSchema)