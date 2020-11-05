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

router.route('/:id').get((req, res) => {
    Article.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json('Error in get request: ' + err));
})

router.route('/:id').delete((req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(() => res.json('Article deleted!'))
        .catch(err => res.status(400).json('Error in delete request: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            article.headline = req.body.headline;
            article.excerpt = req.body.excerpt;
            article.content = req.body.content;
            article.date = Date.parse(req.body.date);
            article.user = req.body.user;
            //article.image = req.body.image;
            //article.caption = req.body.caption;

            article.save()
                .then(() => res.json('Article updated!'))
                .catch(err => res.status(400).json('Error in update request: ' + err));
        })
        .catch(err => res.status(400).json('Error in delete request: ' + err));
});

module.exports = router;