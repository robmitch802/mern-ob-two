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

router.route('/:id').get((req, res) => {
    Meeting.findById(req.params.id)
        .then(meeting => res.json(meeting))
        .catch(err => res.status(400).json('Error in get request: ' + err));
})

router.route('/:id').delete((req, res) => {
    Meeting.findByIdAndDelete(req.params.id)
        .then(() => res.json('Meeting deleted!'))
        .catch(err => res.status(400).json('Error in delete request: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Meeting.findById(req.params.id)
        .then(meeting => {
            meeting.headline = req.body.headline;
            meeting.excerpt = req.body.excerpt;
            meeting.content = req.body.content;
            meeting.date = Date.parse(req.body.date);
            meeting.user = req.body.user;
            //meeting.image = req.body.image;
            //meeting.caption = req.body.caption;

            meeting.save()
                .then(() => res.json('Meeting updated!'))
                .catch(err => res.status(400).json('Error in update request: ' + err));
        })
        .catch(err => res.status(400).json('Error in delete request: ' + err));
});

module.exports= router;