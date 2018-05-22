// import * as azureArmSb from 'azure-arm-sb';
const logger = require('./logger-service');
var azure = require('azure');
var azureArmSb = require('azure-arm-sb');
var msRestAzure = require('ms-rest-azure');
var msRest = require('ms-rest');

let __NAMESPACE = "emobility-dev";
let __RESOURCE_GROUP_NAME = "emobility-dev";
let __SUBSCRIPTION_ID = "9a932847-7c35-485e-bb5c-8994d756e8cd";
let __ACCESSKEY = "Endpoint=sb://emobility-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7cxcLgz19bR7rzZuYbZb1cDVGl7MDwBLUzoQTXCLINU=";


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
    getAllTopics: function (token) {
        log("getAllTopics: ", token);
        return new Promise(function (resolve, reject) {
            let tk = new msRest.TokenCredentials(token);
            var client = new azureArmSb.ServiceBusManagementClient(tk, __SUBSCRIPTION_ID);

            client.topics.listByNamespace(__RESOURCE_GROUP_NAME, __NAMESPACE)
                .then(topics => {
                        resolve(topics);
                    },
                    err =>
                    log(err)
                );
        });
    },
    getSubscriptionsByTopic: function (token, topic) {
        log("getSubscriptionsByTopic: ", token);
        return new Promise(function (resolve, reject) {
            let tk = new msRest.TokenCredentials(token);
            var client = new azureArmSb.ServiceBusManagementClient(tk, __SUBSCRIPTION_ID);

            client.subscriptions.listByTopic(__RESOURCE_GROUP_NAME, __NAMESPACE, topic)
                .then(subscriptions => {
                        resolve(subscriptions);
                    },
                    err =>
                    log(err)
                );
        });
    },
    getNamespaces: function (token) {
        log("getNamespaces: ", token);
        return new Promise(function (resolve, reject) {
            let tk = new msRest.TokenCredentials(token);
            var client = new azureArmSb.ServiceBusManagementClient(tk, __SUBSCRIPTION_ID);

            client.namespaces.listByResourceGroup(__RESOURCE_GROUP_NAME)
                .then(namespaces => {
                        resolve(namespaces);
                    },
                    err =>
                    log(err)
                );
        });
    },
    receiveSubscriptionMessage: function (topic, subscriptionName) {
        log(`getMessage: ${subscriptionName} ${topic}`);
        return new Promise(function (resolve, reject) {
            let azureSbService = azure.createServiceBusService(__ACCESSKEY);
            azureSbService.receiveSubscriptionMessage(topic, subscriptionName, function (error, receivedMessage) {
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