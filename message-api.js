"use strict";

function messageIm(app_secret) {
    var app_secret = app_secret;
    this.customers = {};
    this.integrations = {};

    var getCustomers = function (id) {
        return "get customer";
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
    this.customers.Add = AddCustomer;
    this.customers.Update = UpdateCustomer;
    this.customers.Delete = DeleteCustomer;
}

module.exports = messageIm;
