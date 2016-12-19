/**
 * Created by balank on 5/12/2016.
 */
module.exports = function (app, docClient) {

    // Generate a v4 UUID (random)
    const uuidV4 = require('uuid/v4');
    var tableName = 'Class';
    uuidV4();

    return function () {

        console.log('INIT CLASS API');

        app.get('/api/class/get', function (req, res) {
            debugger;
            console.log("GET CLASS----------------- api/class/get =========== " + JSON.stringify(req.params) + " ::: " + JSON.stringify(req.query));
            var params = {
                TableName: tableName,
                KeyConditionExpression: 'id = :value', // a string representing a constraint on the attribute
                FilterExpression: 'schoolId = :val', // a string representing a constraint on the attribute
                ExpressionAttributeValues: { // a map of substitutions for all attribute values
                    ':value': 'STRING_VALUE',
                    ':val': req.query.schoolId
                }
            };
            docClient.query(params, function(err, data) {
                if (err) {
                    console.log('failed to get classes' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'classes': data.Items});
            });
        });

        app.post('/api/class/add', function (req, res) {
            console.log("ADD CLASS----------------- api/class/add =========== " + JSON.stringify(req.body));
            var params = {
                TableName: tableName,
                Item: { // a map of attribute name to AttributeValue
                    'id': uuidV4(),
                    'std': req.body.std,
                    'teacherId': req.body.teacherId,
                    'schoolId': req.body.schoolId
                }
            };
            docClient.put(params, function(err, data) {
                if (err) {
                    console.log('failed to add class' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'data': JSON.stringify(data)});
            });
        });

        app.post('/api/class/update', function (req, res) {
            console.log("UPDATE CLASS----------------- api/class/add =========== " + JSON.stringify(req.body));
            var params = {
                TableName: tableName,
                Key: { // a map of attribute name to AttributeValue
                    id: req.body.id
                },
                UpdateExpression: 'set std=:std, teacherId=:teacherId',
                ExpressionAttributeValues:{
                    ':std': req.body.std,
                    ':teacherId': req.body.teacherId
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

        app.post('/api/class/delete', function (req, res) {
            console.log('DELETE CLASS----------------- api/class/add =========== ' + JSON.stringify(req.body));
            var params = {
                TableName: tableName,
                Key: { // a map of attribute name to AttributeValue
                    id: req.body.id,
                    schoolId: req.body.schoolId
                }
            };
            docClient.delete(params, function(err, data) {
                if (err) {
                    console.log('failed to delete class' + JSON.stringify(err));
                    return;
                }
                res.json({'success': true, 'data': JSON.stringify(data)});
            });
        });

    }();



};



/*-------------CREATE TABLE FOR CLASS---------*/

/*

 var params = {
 TableName: 'Class',
 KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
 { // Required HASH type attribute
 AttributeName: 'id',
 KeyType: 'HASH',
 },
 { // Required HASH type attribute
 AttributeName: 'schoolId',
 KeyType: 'RANGE',
 }
 ],
 AttributeDefinitions: [
 {
 AttributeName: 'id',
 AttributeType: 'S', // (S | N | B) for string, number, binary
 },
 {
 AttributeName: 'schoolId',
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