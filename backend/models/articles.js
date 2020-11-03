const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    headline: { type: String, required: true },
    excerpt: String,
    content: String,
    date: { type: Date },
    user: String,
    //image: { data: Buffer, contentType: String },
    //caption: String,
}, 
{
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;