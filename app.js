var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
console.log("__dirname:" + __dirname);

app.use(bodyParser.json()); // for parsing application/json

app.get('/', function (req, res) {
    console.log("app.get(/*) =========== " + req.url);
    res.sendFile(__dirname + '/public/' + req.url + '.html');
});

app.get('/api/maps/*', function (req, res) {
    console.log("app.get(/*) =========== " + req.url);
    debugger;
    var filePath = req.url.substring(req.url.indexOf('/maps/') + 6, req.url.length)
    console.log("app.get filePath(/*) =========== " + filePath);
    res.sendFile(__dirname + '/public/responses/' + filePath + '.json');
})

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});


// Load the SDK and UUID
var AWS = require('aws-sdk');
/*-LIVE----------*/
/*AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIAJOSD36P33T3TV27Q",
    secretAccessKey: "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"
});*/

/*-LOCAL----------*/
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000/"
});


// Create an S3 client
var s3 = new AWS.S3();
var dynamodb = new AWS.DynamoDB();

dynamodb.listTables({}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});

/*// Create a bucket and upload something into it
 var bucketName = 'node-sdk-sample-' + uuid.v4();
 var keyName = 'hello_world.txt';

 s3.createBucket({Bucket: bucketName}, function() {
 var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
 s3.putObject(params, function(err, data) {
 if (err)
 console.log(err)
 else
 console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
 });
 });*/
