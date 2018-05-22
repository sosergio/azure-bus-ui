const express = require('express');
const router = express.Router();
const azureService = require('./../services/azure-service');

router.get('/azure/login', async (req, res) => {
    azureService.login().then(r =>
        res.send(r));
});

router.get('/azure/login/:id', async (req, res) => {
    let id = req.params['id'];
    azureService.getAccessTokenByLoginId(id).then(r =>
        res.send(r));
});

router.get('/azure/topics', (req, res) => {
    let cs = req.headers['x-azure-cs'];
    azureService.getAllTopics(cs).then(r =>
        res.send(r));
});

router.get('/azure/topics/:topicName/subscriptions', (req, res) => {
    let cs = req.headers['x-azure-cs'];
    let topicName = req.params.topicName;
    azureService.getSubscriptionsByTopic(cs, topicName).then(r =>
        res.send(r));
});

router.get('/azure/topics/:topicName/subscriptions/:subscriptionName/message', async (req, res) => {
    let topicName = req.params['topicName'];
    let subscriptionName = req.params['subscriptionName'];
    azureService.receiveSubscriptionMessage(topicName, subscriptionName).then(r =>
        res.send(r));
});

module.exports = router;