const express = require('express');
const router = express.Router();
var fs = require('fs');
const articleService = require('./../services/articles-service');
const fbService = require('./../services/facebook-service');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/topics/:topic', (req, res) => {
    var obj = articleService.getAll(req.params.topic);
    res.send(obj);
});

router.get('/topics/:topic/:id', (req, res) => {
    let articleId = req.params.id;
    var obj = articleService.getById(req.params.topic, articleId);
    res.send(obj);
});

router.post('/fb-post', (req, res) => {
    let message = req.body.message;
    let link = req.body.link;
    if (message && link) {
        fbService.post(message, link);
        res.send(`ok`);
    }else{
        throw new Erro("Invalid Request");
    }
});

module.exports = router;