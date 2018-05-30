const express = require('express');
const router = express.Router();
const azureService = require('./../services/azure-service');

router.get('/azure/login', async (req, res) => {
    azureService.login().then(r =>
        res.send(r),
        err => res.sendStatus(err.statusCode || 500));
});

router.get('/azure/login/:id', async (req, res) => {
    let id = req.params['id'];
    azureService.getAccessTokenByLoginId(id).then(r =>
        res.send(r), err => res.sendStatus(err.statusCode || 500));
});

router.get('/azure/subscriptions', (req, res) => {
    let cs = req.headers['x-azure-token'];
    azureService.getUserSubscriptions(cs).then(r =>
        res.send(r), err => err => res.sendStatus(err.statusCode || 500));
});

router.get('/azure/subscriptions/:subscription/resource-groups', (req, res) => {
    let cs = req.headers['x-azure-token'];
    let subscription = req.params.subscription;
    azureService.getResourceGroups(cs, subscription).then(r =>
        res.send(r), err => err => res.sendStatus(err.statusCode || 500));
});

router.get('/azure/subscriptions/:subscription/resource-groups/:resourceGroup/namespaces', (req, res) => {
    let cs = req.headers['x-azure-token'];
    let subscription = req.params.subscription;
    let resourceGroup = req.params.resourceGroup;
    azureService.getNamespaces(cs, subscription, resourceGroup).then(r =>
        res.send(r), err => err => res.sendStatus(err.statusCode || 500));
});

router.get('/azure/subscriptions/:subscription/resource-groups/:resourceGroup/namespaces/:namespace/topics', (req, res) => {
    let cs = req.headers['x-azure-token'];
    let subscription = req.params.subscription;
    let namespace = req.params.namespace;
    let resourceGroup = req.params.resourceGroup;
    azureService.getAllTopics(cs, subscription, resourceGroup, namespace).then(r =>
        res.send(r), err => {
            console.log(`error at the api level`, err);
            res.sendStatus(err.statusCode || 500);
        });
});

router.get('/azure/subscriptions/:subscription/resource-groups/:resourceGroup/namespaces/:namespace/topics/:topicName/subscriptions', (req, res) => {
    let cs = req.headers['x-azure-token'];
    let subscription = req.params.subscription;
    let topicName = req.params.topicName;
    let namespace = req.params.namespace;
    let resourceGroup = req.params.resourceGroup;
    azureService.getSubscriptionsByTopic(cs, subscription, resourceGroup, namespace, topicName).then(r =>
        res.send(r), err => res.sendStatus(err.statusCode || 500));
});

router.post('/azure/subscriptions/:subscription/resource-groups/:resourceGroup/namespaces/:namespace/topics/:topicName/subscriptions', (req, res) => {
    let cs = req.headers['x-azure-token'];
    let subscription = req.params.subscription;
    let topicName = req.params.topicName;
    let namespace = req.params.namespace;
    let resourceGroup = req.params.resourceGroup;
    let subscriptionName = req.body.name;
    azureService.addSubscriptionToTopic(cs, subscription, resourceGroup, namespace, topicName, subscriptionName).then(r =>
        res.send(r), err => res.sendStatus(err.statusCode || 500));
});

router.delete('/azure/subscriptions/:subscription/resource-groups/:resourceGroup/namespaces/:namespace/topics/:topicName/subscriptions/:subscriptionName', (req, res) => {
    let cs = req.headers['x-azure-token'];
    let subscription = req.params.subscription;
    let topicName = req.params.topicName;
    let namespace = req.params.namespace;
    let resourceGroup = req.params.resourceGroup;
    let subscriptionName = req.params.subscriptionName;
    azureService.deleteSubscriptionToTopic(cs, subscription, resourceGroup, namespace, topicName, subscriptionName).then(r =>
        res.send(r), err => res.sendStatus(err.statusCode || 500));
});

router.get('/azure/subscriptions/:subscription/resource-groups/:resourceGroup/namespaces/:namespace/topics/:topicName/subscriptions/:subscriptionName/message', async (req, res) => {
    let cs = req.headers['x-azure-cs'];
    let subscription = req.params.subscription;
    let topicName = req.params.topicName;
    let namespace = req.params.namespace;
    let subscriptionName = req.params.subscriptionName;
    let resourceGroup = req.params.resourceGroup;
    azureService.receiveSubscriptionMessage(cs, topicName, subscriptionName).then(r =>
        res.send(r), err => res.sendStatus(204));
});

module.exports = router;