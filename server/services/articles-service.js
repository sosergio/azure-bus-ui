const logger = require('./logger-service');

function log(msg) {
    logger.log(`ArticleService | ${msg}`);
}

var service = {
    getAll: function (name) {
        log(`getAll topic:${name}`);

        let data = [];
        try {
            data = [{
                id: 'uno'
            }, {
                id: 'due'
            }, {
                id: 'tre'
            }];
        } catch (error) {
            log('getAll error: ', error);
        }
        return data || [];
    },
    getById: function (name, id) {
        log(`getById topic:${name} id:${id}`);
        return this.getAll(name).find(p => p.id == id);
    }

}

module.exports = service;