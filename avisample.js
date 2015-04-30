var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("Be the change you wish to see in the world");
quotes.push("Why isn't the wifi better around here?");
quotes.push("I hate Amazon");
quotes.push("All hail the mighty Amazon");
quotes.push("I will not be silenced");
quotes.push("Amazon.....");
quotes.push("Self destruct in 5, 4, 3, 2, 1");


function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'Quotes from Avi',
                subtitle: 'Software E Block',
                content: theText
            },
            shouldEndSession: 'false'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            if (jsonString.length > 0)
                console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(getRandomQuote()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(3011); //Put number in the 3000 range for testing and 443 for production
