const router = require('express').Router();
let Meeting = require('../models/meetings');

router.route('/').get((req, res) => {
    Meeting.find()
        .then(meetings => res.json(meetings))
        .catch(err => res.status(400).json('Error in get request: ' + err));
});

router.route('/add').post((req, res) => {
    const headline = req.body.headline;
    const location = req.body.location;
    const time = req.body.time;
    const link = req.body.link;
    const agenda = req.body.agenda;
    const date = Date.parse(req.body.date);
    const minutes = req.body.minutes;
    const featured = req.body.featured;
    const user = req.body.user;

    const newMeeting = new Meeting({ headline, location, time, link, agenda, date, minutes, featured, user })

    newMeeting.save()
        .then(() => res.json('New meeting saved!'))
        .catch(err => res.status(400).json('Error in post request: ' + err));
});

module.exports= router;