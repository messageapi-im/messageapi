# MessageAPI.im

The MessageAPI Node library provides convenient access to the MessageAPI API from applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that uses MessageAPI App secret keys. To get your MessageAPI App secret you need to [Sign up](http://messageapi.im/signup/?utm_source=npm&utm_medium=link)

# Documentation

See the [Node API docs](http://docs.messageapi.im/?javascript#quick-start).

# Installation

Install the package with:

`npm install messageapi-im --save`

# Usage

The package needs to be configured with your account's secret key which you will get after [Sign up](http://messageapi.im/signup/?utm_source=npm&utm_medium=link). Require it with the key's value:


```javascript
var messageIm = require('messageapi-im')('[YOUR_APP_SECRET]');
```

## Quick Start:
After sign up you need to complete these 3 steps to start sending messages

1. Connect one or more of your messaging channels via the Create integration setup
2. Create a webhook and get messages back from your customer, on top, via the webhook you will get message events like : delivered, seen , etc. To note you can skip this step and get the messages via get message
3. Create a customer and add his user id in the relevant messaging channel

We have created this example using the **Viber** channel, to learn how to connect other channels, see the [Node API docs](http://docs.messageapi.im/?javascript#create-integration).  
 
### Create Integration

```javascript
messageApiIm.integrations.Create({
    "type": "viber",
    "auth_token": "[VIBER_AUTH_TOKEN]"
 }).then(function (result) {
    var integration = result.integration;
 });
```

### Create a Webhook

```javascript
messageApiIm.webhooks.Create({
    "webhook_url":"https://url.com"
}).then(function (result) {
    var webhook = result.webhook;
});
```

### Create a Customer

```javascript
messageApiIm.customers.Create({
    "viber": {"user_id": "[USER_ID_OF_VIBER]"}
}).then(function (result) {
    var customer = result.customer;
});
```


### Send a Message

```javascript
messageApiIm.messaging.Send({
    "customer_id": "<customer_id>",
    "integration_id": "<integration_id>",
    "data": {
        "type": "text",
        "content": "your text"}
}).then(function (result) {
    var message = result.message;
});
```

# More Information

See the [Node API docs](http://docs.messageapi.im/?javascript).
