const mongoose = require('mongoose');


const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    comments: [{
        content: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', },
    }],
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);