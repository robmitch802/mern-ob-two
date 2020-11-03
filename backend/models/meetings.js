const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    headline: String,
    date: { type: Date, required: true },
    location: String, 
    time: String,
    link: String,
    agenda: String,
    minutes: String,
    featured: Boolean,
    user: String,
},
{
    timestamps: true,
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;