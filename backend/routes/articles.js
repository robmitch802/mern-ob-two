const router = require('express').Router();
let Article = require('../models/articles');

router.route('/').get((req, res) => {
    Article.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json('Error in get request: ' + err));
});

router.route('/add').post((req, res) => {
    const headline = req.body.headline;
    const excerpt = req.body.excerpt;
    const content = req.body.content;
    const date = Date.parse(req.body.date);
    const user = req.body.user;
    //const image = req.body.image;
    //const caption = req.body.caption;

    const newArticle = new Article({ headline, excerpt, content, date, user })

    newArticle.save()
        .then(() => res.json('New article saved!'))
        .catch(err => res.status(400).json('Error in post request: ' + err));
});

router.route('/update/:id').post((req, res) => {
    
})

module.exports = router;