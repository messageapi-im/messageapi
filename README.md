# messageapi.im

> [Documentaion](http://messageapi-doc.azurewebsites.net/)

> To authorize, use this code:

```javascript
var messageIm = require('messageapi-im')('<YOUR APP_SECRET>');
```


## Quick example:
#### Create Integration
```javascript
messageIm.integrations.Create({
    "type":"line",
    "bot_id":"<BOT_ID>",
    "access_token":"<ACCESS_TOKEN>"

}).then(function(result){
    if(result.status)
        console.log(result.integration._id);
},function(error){
    
})
```

#### Create Customer
```javascript
messageIm.customers.Create({
    "email":"email@domain.com",
    "line":{"user_id":"225451339750443406022273244"}
}).then(function(result){
    if(result.status)
        console.log(result.customer._id);
},function(error){
    
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
}).then(function(result){
    if(result.status)
        console.log(result.message._id);
},function(error){
    
})
```

#### Add Webhook
```javascript
messageIm.webhooks.Create({
    "event":"received_message",
    "webhook_url":"http://yourpath.com/path"
}).then(function(result){
    if(result.status)
        console.log(result.webhook._id);
},function(error){
    
})
```


# More Examples:
### Integrations
##### Get

```javascript
messageIm.integration.Get('<ID_INTEGRATION>').then(function(result){

},function(error){
    
})
```
```javascript
messageIm.customers.GetAll().then(function(result){

},function(error){
    
})
```
##### Create
```javascript
messageIm.integration.Create({
    "type":"line",  
    "bot_id":"<BOT_ID>",
    "access_token":"<ACCESS_TOKEN>"
}).then(function(result){
    
},function(error){
    
})
```

##### Update
```javascript
messageIm.integration.Update('<ID_INTEGRATION>',{    
    "access_token":"<ACCESS_TOKEN>"
}).then(function(result){
   
})
```
##### Delete
```javascript
messageIm.integration.Delete('<ID_INTEGRATION>')
    .then(function(result){
   
})
```

### Customers
##### Get

```javascript
messageIm.customers.Get('<ID_CUSTOMER>').then(function(result){

})
```
```javascript
messageIm.customers.GetAll().then(function(result){

})
```

##### Create
```javascript
messageIm.customers.Create({
    "email":"email@domain.com",
    "line":{"user_id":"<USER_ID_OF_LINE>"}
}).then(function(result){
    
})
```

##### Update
```javascript
messageIm.customers.Update('<ID_CUSTOMER>',{    
    "telegram":{"user_id":"<USER_ID_OF_TELEGRAM>"}
}).then(function(result){
   
})
```
##### Delete
```javascript
messageIm.customers.Delete('<ID_CUSTOMER>')
    .then(function(result){
   
})
```