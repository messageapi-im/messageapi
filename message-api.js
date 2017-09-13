"use strict";
var request = require("request");
var Q = require('q');
var fs = require('fs');
function messageIm(app_secret) {
    var APP_SECRET = app_secret;
    var domain = 'https://api.messageapi.im';
    var ver = 'v1';
    this.customers = {};
    this.integrations = {};
    this.webhooks = {};
    this.messages = {};
    this.media = {};

    //CUSTOMERS.
    var GetCustomers = function (id, options) {
        return exec('customers', 'GET', id, options);
    };
    var AddCustomer = function (data) {
        return exec('customers', 'POST', undefined, data);
    };
    var UpdateCustomer = function (id, data) {
        return exec('customers', 'PUT', id, data);
    };
    var DeleteCustomer = function (id) {
        return exec('customers', 'DELETE', id);
    };

    //INTEGRATIONS
    var GetIntegrations = function (id) {
        return exec('integrations', 'GET', id, undefined);
    };
    var AddIntegration = function (data) {
        return exec('integrations', 'POST', undefined, data);
    };
    var UpdateIntegration = function (id, data) {
        return exec('integrations', 'PUT', id, data);
    };
    var DeleteIntegration = function (id) {
        return exec('integrations', 'DELETE', id);
    };

    //WEBHOOKS
    var GetWebhooks = function (id) {
        return exec('webhooks', 'GET', id, undefined);
    };
    var AddWebhook = function (data) {
        return exec('webhooks', 'POST', undefined, data);
    };
    var UpdateWebhook = function (id, data) {
        return exec('webhooks', 'PUT', id, data);
    };
    var DeleteWebhook = function (id) {
        return exec('webhooks', 'DELETE', id);
    };

    //MESSAGING
    var GetMessages = function (id) {
        return exec('messages', 'GET', id, undefined);
    };
    var SendMessage = function (data) {
        return exec('messages', 'POST', undefined, data);
    };

    var DownloadMedia = function (id, path_to_save) {
        return PIPE('media', id, path_to_save);
    }
    //public
    this.customers.Get = function (id) {
        if (!id)
            throw Error('Missing ID');
        if (typeof id === "object")
            throw Error('invalid ID');
        else
            return GetCustomers(id);
    };
    this.customers.GetAll = function (options) {
        return GetCustomers(undefined, options)
    };
    this.customers.Create = AddCustomer;
    this.customers.Update = function (id, data) {
        if (!id || typeof id !== 'string')
            throw Error('Missing ID');
        if (!data || typeof data !== 'object')
            throw Error('Missing data');
        else
            return UpdateCustomer(id, data);
    };
    this.customers.Delete = function (id) {
        if (!id)
            throw Error('Missing ID');
        else
            return DeleteCustomer(id);
    };

    this.integrations.Get = function (id) {
        if (!id)
            throw Error('Missing ID');
        else
            return GetIntegrations(id);
    };
    this.integrations.GetAll = GetIntegrations;
    this.integrations.Create = AddIntegration;
    this.integrations.Update = function (id, data) {
        if (!id || typeof id !== 'string')
            throw Error('Missing ID');
        if (!data || typeof data !== 'object')
            throw Error('Missing data');
        else
            return UpdateIntegration(id, data);
    };
    this.integrations.Delete = function (id) {
        if (!id)
            throw Error('Missing ID');
        else
            return DeleteIntegration(id);
    };

    this.webhooks.Get = function (id) {
        if (!id)
            throw Error('Missing ID');
        else
            return GetWebhooks(id);
    };
    this.webhooks.GetAll = GetWebhooks;
    this.webhooks.Create = AddWebhook;
    this.webhooks.Update = function (id, data) {
        if (!id || typeof id !== 'string')
            throw Error('Missing ID');
        if (!data || typeof data !== 'object')
            throw Error('Missing data');
        else
            return UpdateWebhook(id, data);
    };
    this.webhooks.Delete = function (id) {
        if (!id)
            throw Error('Missing ID');
        else
            return DeleteWebhook(id);
    };

    this.messages.GetNewMessages = GetMessages;
    this.messages.Send = SendMessage;

    this.media.DownloadMedia = function (id, diretory) {
        if (!id)
            throw Error('Missing ID');
        else
            return DownloadMedia(id, diretory);
    }
    var exec = function (collection, method, ID, data) {
        var deferred = Q.defer();
        var options = {
            method: method,
            url: domain + '/' + ver + '/' + collection,
            headers: {
                'authorization': APP_SECRET,
                'content-type': 'application/json'
            },
            json: data || true,
            qs: (method == 'GET' ? data : {})
        };
        if (ID)
            options.url += '/' + ID;

        request(options, function (error, response, body) {
            if (error) {
                deferred.reject(error);
                return;
            }
            if (response.statusCode != 200)
                deferred.reject(body);

            else {
                try {
                    deferred.resolve(body);
                } catch (e) {
                    deferred.reject("ERROR");
                }
            }
            // callback(error, response, body);
        });

        return deferred.promise;
    }
    var PIPE = function (collection, ID, path_to_save) {
        var deferred = Q.defer();
        var options = {
            method: 'GET',
            url: domain + '/' + ver + '/' + collection,
            headers: {
                'authorization': APP_SECRET,
                'content-type': 'application/json'
            },
            json: true
        };
        if (ID)
            options.url += '/' + ID;
        request(options, function (error, response, body) {
            if (body && body.error)
                deferred.resolve(body);
        }).on('response', function (response, body, da) {
            var ct = response.headers['content-type'];
            if (ct.indexOf('application/json') == -1) {
                var ext = ct.substr(ct.lastIndexOf('/') + 1);
                if (ext == 'mpeg4')
                    ext = 'mpeg';
                var filename = getRandomInt(10000, 99999999);
                if (!path_to_save || path_to_save.trim() == '') {
                    path_to_save = __dirname;
                    path_to_save = path_to_save.substr(0, path_to_save.indexOf('node_modules\\messageapi'));
                }
                response.pipe(fs.createWriteStream(path_to_save + '/' + filename + '.' + ext));
                deferred.resolve({status: true, filename: filename + '.' + ext});
            }
        }).on('data', function (chunk) {

        });

        return deferred.promise;
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
}

module.exports = function (app_secret) {
    return new messageIm(app_secret);
};
