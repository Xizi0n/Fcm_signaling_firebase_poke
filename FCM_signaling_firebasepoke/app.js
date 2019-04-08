const express = require('express');
const app = express();
var FCM = require("fcm-push");
var serverKey = 'AAAAXp5z_k8:APA91bE7WxX0gp82oqE2gmtsL_Wz-snpEN1irdFxaPMpFZV7slaGcAlk8Y4xXBncAjitZPb-HyO-xoDoMAgYfEmpsw9BVP_vaVCRkGFUXun0cQsfB87zpU5GLffnR25t1Y60MQBPlJxE';
var fcm = new FCM(serverKey);
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



// Notification küldése (Az app hátérben van)
function sendMessage(fromWhom, toWhom, message) {
    var message = {
        to: toWhom,
        notification: {
            title: 'Firebase Poke Message',
            body: message,
            sound: 'default'
        }
    };
    fcm.send(message).then(response => {
            console.log("Successfully sent notification with response: " + response);
        })
        .catch(error => {
            console.log("Something went wrong with notification!", error);
        });

};

// Data üzenet küldése (Az app előtérben van)

function sendData(fromWhom, toWhom, message,) {
    var message = {
        data: {
            fromWho: fromWhom,
            toWho: toWhom,
            message: message
        }
    };
    fcm.send(message).then(response => {
            console.log("Successfully sent data with response: " + response);
        })
        .catch(error => {
            console.log("Something went wrong with data!", error);
        });
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/sendMessage/:target', (req, res) => {
    var targetToken = req.params.target;
    console.log('request body:');
    console.log(req.body);
    console.log(typeof req.body);
    console.log(req.body.from);
    console.log(req.body.message);
    var fromToken = req.body.from;
    var message = req.body.message;
    var timeStamp = new Date();
    // Debug
    if (targetToken && fromtoken) {
        sendMessage(fromToken, targetToken, message);
        sendData(fromToken, targetToken, message);
        return res.status(200).json("Message sent successfully!");
    }
    else{
        return res.status(400).json("Error when sending message!");
    }
});


var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
