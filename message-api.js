"use strict";
var request = require("request");
var Promise = require('promise');
function messageIm(app_secret) {
    var APP_SECRET = app_secret;
    console.log('app sercret');
    this.customers = {};
    this.integrations = {};

    var getCustomers = function (id) {
        var promise = new Promise(function (resolve, reject) {
            exec('customers', 'GET', id, function (error, response, body) {
                if (response.statusCode != 200)
                    reject(error);
                else if (body.status)
                    resolve(body.customer || body.customers,undefined,body.warning)
                else
                    resolve(undefined, body.error);
            });
        });
        return promise;
    };
    var AddCustomer = function () {
        return "add customer";
    };
    var UpdateCustomer = function (id) {
        return "update customer";
    };
    var DeleteCustomer = function (id) {
        return "del customer";
    };
    this.customers.Get = getCustomers;
    this.customers.GetAll = getCustomers;
    this.customers.Create = AddCustomer;
    this.customers.Update = UpdateCustomer;
    this.customers.Delete = DeleteCustomer;


    var exec = function (collection, method, ID, data, callback) {
        var options = {
            method: method,
            url: 'http://localhost:4500/v1/' + collection,
            headers: {
                'authorization': APP_SECRET,
                'content-type': 'application/json'
            },
            json: data
        };
        if (ID)
            options.url += '/' + ID;

        request(options, function (error, response, body) {
            callback(error, response, body);
        });
    }
}

module.exports = function (app_secret) {
    return new messageIm(app_secret);
};
