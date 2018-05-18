const logger = require('./logger-service');

const access_token = "EAACwuDNZCbFQBAJFpiP0c3Hnhn9trYcPNmBwloP07NReOscIGS1Rzt2bRDfsrRFboKIcI2r360caokRPTVA2ZBWE1iTVssyaD13lZCZC3QEVoXMTdTDmO4RhoNCr2knZAZAO3tqF3Q8QmDVZBmyIMRiXNJ9sHYZCsD4fqCZBR4tal5gSy6b8zNOB1gmVOBmVcs9IZD";
const app_id = "205077083370542";
const app_secret = "27166297f7a125083a1ae10fd5ce7af8";

function log(msg) {
    logger.log(`FacebookService | ${msg}`);
}


var service = {
    init: function () {
        // FB.options({
        //     version: 'v2.4'
        // });
        // FB.extend({
        //     appId: app_id,
        //     appSecret: app_secret
        // });
        // FB.setAccessToken(access_token);
    },
    post: function (message, link) {
        log(`post message:${message}, link:${link}`);

        // FB.api(
        //     'me/feed',
        //     'POST', {
        //         'message': message,
        //         'link': link

        //     },
        //     function (res) {
        //         if (!res || res.error) {
        //             log(!res ? 'post error occurred' : res.error);
        //             return;
        //         }
        //         log('post succeeded with id: ' + res.id);
        //     });
    }
}

module.exports = service;