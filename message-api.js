"use strict";
var request = require("request");
var Q = require('q');
function messageIm(app_secret) {
    var APP_SECRET = app_secret;
    var domain = 'https://api.messageapi.im';
    var ver = 'v1';
    this.customers = {};
    this.integrations = {};
    this.webhooks = {};
    this.messaging = {};

    //CUSTOMERS.
    var GetCustomers = function (id) {
        return exec('customers', 'GET', id, undefined);
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
        return exec('messaging', 'GET', id, undefined);
    };
    var SendMessage = function (data) {
        return exec('messaging', 'POST', undefined, data);
    };

    //public
    this.customers.Get = function (id) {
        if (!id)
            throw Error('Missing ID');
        else
            return getCustomers(id);
    };
    this.customers.GetAll = GetCustomers;
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
            return getIntegrations(id);
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
            return getWebhooks(id);
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

    this.messaging.GetNewMessages = GetMessages;
    this.messaging.Send = SendMessage;
    ;
    var exec = function (collection, method, ID, data) {
        var deferred = Q.defer();
        var options = {
            method: method,
            url:domain+'/'+ver+'/'+collection,
            headers: {
                'authorization': APP_SECRET,
                'content-type': 'application/json'
            },
            json: data || true
        };
        if (ID)
            options.url += '/' + ID;

        request(options, function (error, response, body) {
            if (response.statusCode != 200)
                reject(error);
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
}

module.exports = function (app_secret) {
    return new messageIm(app_secret);
};
