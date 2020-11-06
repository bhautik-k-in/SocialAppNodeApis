const mongoose = require('mongoose')
require("dotenv/config")

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => { console.log("MongoDB Connected".yellow) })
    .catch(err => {
        console.log("Error while connecting database " + err)
    })

module.exports.role = require("./roleModel")
module.exports.user = require("./userModel")
module.exports.post = require("./postModel")
module.exports.comment = require("./commentModel")