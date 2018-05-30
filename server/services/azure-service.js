// import * as azureArmSb from 'azure-arm-sb';
const logger = require('./logger-service');
var azure = require('azure');
var azureArmSb = require('azure-arm-sb');
var azureSb = require('azure-sb');
var msRestAzure = require('ms-rest-azure');
var azureArmResource = require('azure-arm-resource');
var msRest = require('ms-rest');

function log(msg) {
    logger.log(`AzureService | ${msg}`);
}

let __logins = [];

var service = {

    login: function () {
        log("login");
        let newLogin = {
            id: new Date().getTime().toString()
        };
        return new Promise(function (resolve, reject) {
            msRestAzure.interactiveLogin({
                userCodeResponseLogger: function (message) {
                    newLogin.message = message;
                    __logins.push(newLogin);
                    resolve(newLogin);
                }
            }, function (err, credentials) {

                if (err) {
                    newLogin.error = err;
                    console.log(err);
                } else {
                    newLogin.credentials = credentials;
                }
            });
        });
    },

    getAccessTokenByLoginId: function (id) {
        log("getAccessTokenByLoginId: ", id);
        return new Promise(function (resolve, reject) {
            resolve(__logins.find(l => l.id == id));
        });
    },

    getUserSubscriptions: function (token) {
        log(`getUserSubscriptions: `);
        return new Promise(function (resolve, reject) {
            try {
                let tk = new msRest.TokenCredentials(token);
                var subClient = new azureArmResource.SubscriptionClient(tk);

                subClient.subscriptions.list()
                    .then(subs => {
                            resolve(subs);
                        },
                        err => {
                            log(err);
                            reject(err);
                        }
                    );
            } catch (err) {
                log(err);
                reject(err);
            }
        });
    },

    getResourceGroups: function (token, subscription) {
        log(`getResourceGroups: `);
        return new Promise(function (resolve, reject) {
            try {
                let tk = new msRest.TokenCredentials(token);
                var resourceClient = new azureArmResource.ResourceManagementClient(tk, subscription);

                resourceClient.resourceGroups.list()
                    .then(resources => {
                            resolve(resources);
                        },
                        err => {
                            log(err);
                            reject(err);
                        }
                    );
            } catch (err) {
                log(err);
                reject(err);
            }
        });
    },

    getNamespaces: function (token, subscription, resourceGroup) {
        log(`getNamespaces: ${resourceGroup}`);
        return new Promise(function (resolve, reject) {
            let tk = new msRest.TokenCredentials(token);
            var client = new azureArmSb.ServiceBusManagementClient(tk, subscription);
            try {
                client.namespaces.listByResourceGroup(resourceGroup)
                    .then(namespaces => {
                            resolve(namespaces);
                        },
                        err => {
                            log(err);
                            reject(err);
                        }
                    );
            } catch (err) {
                log(err);
                reject(err);
            }
        });
    },

    getAllTopics: function (token, subscription, resourceGroup, namespace) {
        log(`getAllTopics: ${resourceGroup} ${namespace}`);
        return new Promise(function (resolve, reject) {
            let tk = new msRest.TokenCredentials(token);
            var client = new azureArmSb.ServiceBusManagementClient(tk, subscription);
            client.topics.listByNamespace(resourceGroup, namespace)
                .then(topics => {
                        resolve(topics);
                    },
                    err => {
                        log(err);
                        reject(err);
                    }
                );
        });
    },

    getSubscriptionsByTopic: function (token, subscription, resourceGroup, namespace, topic) {
        log("getSubscriptionsByTopic: ", token);
        return new Promise(function (resolve, reject) {
            let tk = new msRest.TokenCredentials(token);
            var client = new azureArmSb.ServiceBusManagementClient(tk, subscription);
            
            client.subscriptions.listByTopic(resourceGroup, namespace, topic)
                .then(subscriptions => {
                        resolve(subscriptions);
                    },
                    err =>
                    log(err)
                );
        });
    },

    receiveSubscriptionMessage: function (connectionString, topic, subscriptionName) {
        log(`getMessage: ${subscriptionName} ${topic}`);
        return new Promise(function (resolve, reject) {
            var client = new azureSb.ServiceBusService(connectionString);
            client.receiveSubscriptionMessage(topic, subscriptionName, function (error, receivedMessage) {
                if (error) {
                    reject(error);
                } else {
                    resolve(receivedMessage);
                }
            });
        });
    }
}

module.exports = service;