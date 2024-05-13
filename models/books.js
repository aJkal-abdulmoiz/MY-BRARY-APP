const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    Authorname:{
        type: String,
        required:true
    },
    Title:{
        type: String,
        required:true
    },
    reviews:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Book',BookSchema)