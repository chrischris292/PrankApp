var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  //response.send("<!DOCTYPE html><html><head>   <link href='styles/style.css' rel='stylesheet'></head><body><div class = 'container'><div id = 'title'>PRANKSTER</div><div id = 'subTitle'>HERE'S TO THE CRAZY ONES</div><input placeholder = 'Type in Phone Number Here'></div></body></html>");
});
var io = require('socket.io').listen(app.listen(8080));
io.sockets.on('connection', function (socket) {
    //socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
var client = require('twilio')('ACc2775a3292d0f421f903e495b7603e8f', '7f0ff6be3231c9eb534212144f1fdf7d');

//Send an SMS text message
if(data!="+1 (206) 484-7887")
{
	client.sendMessage({

	    to: data, // Any number Twilio can deliver to
	    from: '+16505427016', // A number you bought from Twilio and can use for outbound communication
	    body: 'I DID IT.' // body of the SMS message

	}, function(err, responseData) { //this function is executed when a response is received from Twilio

	    if (!err) { // "err" is an error received during the request, if any

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
	     io.sockets.emit('message', {error: false,message: "good"});
	        console.log(responseData.from); // outputs "+14506667788"
	        console.log(responseData.body); // outputs "word to your mother."

	    }
	    else io.sockets.emit('message',{error:true,message:"Invalid Number"})
	});
}
else
io.sockets.emit('message',{error:true,message:"Your IP has been saved"})


    });
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

