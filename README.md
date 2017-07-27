# messageapi.im

> [Documentaion](http://messageapi-doc.azurewebsites.net/)

> To authorize, use this code:

```javascript
var messageIm = require('message-im')('<YOUR APP_SECRET>');
```


## Quick example:
#### Create Integration
```javascript
messageIm.integrations.Create({
    "type":"line",
    "bot_id":"<BOT_ID>",
    "access_token":"<ACCESS_TOKEN>"

}).then(function(integration,error){
    if(!error)
        console.log(integration._id);
})
```

#### Create Customer
```javascript
messageIm.customers.Create({
    "email":"email@domain.com",
    "line":{"user_id":"225451339750443406022273244"}
}).then(function(customer,error){
    if(!error)
        console.log(customer._id);
})
```


#### Send message
```javascript
messageIm.messaging.Send({
    "_customer_id":"customer_id",
    "messengerType":"line",
    "message":{
        "type":"text",
        "content":"your text"
    }
}).then(function(message,error){
    if(!error)
        console.log(message._id);
})
```

#### Add Webhook
```javascript
messageIm.webhooks.Create({
    "event":"received_message",
    "webhook_url":"http://yourpath.com/path"
}).then(function(webhook,error){
    if(!error)
        console.log(webhook._id);
})
```


# More Examples:
### Integrations
##### Get

```javascript
messageIm.integration.Get('<ID_INTEGRATION>').then(function(integration){

})
```
```javascript
messageIm.customers.GetAll().then(function(integrations){

})
```
##### Create
```javascript
messageIm.integration.Create({
    "type":"line",  
    "bot_id":"<BOT_ID>",
    "access_token":"<ACCESS_TOKEN>"
}).then(function(integration,error){
    
})
```

##### Update
```javascript
messageIm.integration.Update('<ID_INTEGRATION>',{    
    "access_token":"<ACCESS_TOKEN>"
}).then(function(integration,error){
   
})
```
##### Delete
```javascript
messageIm.integration.Delete('<ID_INTEGRATION>')
    .then(function(status,error){
   
})
```

### Customers
##### Get

```javascript
messageIm.customers.Get('<ID_CUSTOMER>').then(function(customer){

})
```
```javascript
messageIm.customers.GetAll().then(function(customers){

})
```

##### Create
```javascript
messageIm.customers.Create({
    "email":"email@domain.com",
    "line":{"user_id":"<USER_ID_OF_LINE>"}
}).then(function(customer,error){
    
})
```

##### Update
```javascript
messageIm.customers.Update('<ID_CUSTOMER>',{    
    "telegram":{"user_id":"<USER_ID_OF_TELEGRAM>"}
}).then(function(customer,error){
   
})
```
##### Delete
```javascript
messageIm.customers.Delete('<ID_CUSTOMER>')
    .then(function(status,error){
   
})
```