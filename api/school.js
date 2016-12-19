/**
 * Created by balank on 5/12/2016.
 */
module.exports = function (app, docClient) {

    console.log('----------------------SCHOOL API MODULE CALLED---------------------------');

    // Generate a v4 UUID (random)
    const uuidV4 = require('uuid/v4');
    var tableName = 'School';
    uuidV4();

    return function () {

        console.log('----------------------SCHOOL API FUNCTION RETURNED---------------------------');

        app.get('/api/schools/get', function (req, res) {
            console.log("GET----------------- api/schools/add =========== " + req.body);
            var params = {
                TableName: tableName
            };
            docClient.scan(params, function(err, data) {
                if (err) {
                    console.log('failed to get school' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'schools': data.Items});
            });
        });

        app.post('/api/schools/add', function (req, res) {
            console.log("POST----------------- api/schools/add =========== " + JSON.stringify(req.body));
            var params = {
                TableName: tableName,
                Item: { // a map of attribute name to AttributeValue
                    uuid: uuidV4(),
                    sname: req.body.sname,
                    stype: req.body.stype,
                    shead: req.body.shead
                }
            };
            docClient.put(params, function(err, data) {
                if (err) {
                    console.log('failed to add school' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'data': JSON.stringify(data)});
            });
        });

        app.post('/api/schools/update', function (req, res) {
            console.log("POST----------------- api/schools/update =========== " + JSON.stringify(req.body));
            var params = {
                TableName: tableName,
                Key: { // a map of attribute name to AttributeValue
                    uuid: req.body.uuid
                },
                UpdateExpression: 'set sname=:sname, stype=:stype, shead=:shead',
                ExpressionAttributeValues:{
                    ':stype': req.body.stype,
                    ':shead': req.body.shead,
                    ':sname': req.body.sname
                },
                ReturnValues:"UPDATED_NEW"
            };
            docClient.update(params, function(err, data) {
                if (err) {
                    console.log('failed to update school' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'data': JSON.stringify(data)});
            });
        });

        app.post('/api/schools/delete', function (req, res) {
            console.log("POST----------------- api/schools/delete =========== " + JSON.stringify(req.body));
            var params = {
                TableName: tableName,
                Key: { // a map of attribute name to AttributeValue
                    uuid: req.body.uuid
                }
            };
            docClient.delete(params, function(err, data) {
                if (err) {
                    console.log('failed to delete school' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'data': JSON.stringify(data)});
            });
        });



    }();



};


/*---------------CREATE TABLE ------------------------------*/
/*
 var params = {
 TableName: 'School',
 KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
 { // Required HASH type attribute
 AttributeName: 'uuid',
 KeyType: 'HASH',
 }
 ],
 AttributeDefinitions: [ // The names and types of all primary and index key attributes only
 {
 AttributeName: 'uuid',
 AttributeType: 'S', // (S | N | B) for string, number, binary
 }
 // ... more attributes ...
 ],
 ProvisionedThroughput: { // required provisioned throughput for the table
 ReadCapacityUnits: 1,
 WriteCapacityUnits: 1,
 }
 };
 dynamodb.createTable(params, function(err, data) {
 if (err) ppJson(err); // an error occurred
 else ppJson(data); // successful response

 });

*/
