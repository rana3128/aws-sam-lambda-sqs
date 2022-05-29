const AWS = require('aws-sdk');
const responses = require('./api-responses');
AWS.config.update({ region: process.env.AWS_REASION });

console.log(process.env);

exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.debug('payload', JSON.stringify(event));
    try {
        const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

        const msgData = {
            requestId: "someRequestId",
            customerId: "custId"
        }
        const params = {
            // Remove DelaySeconds parameter and value for FIFO queues
            DelaySeconds: 10,
            MessageAttributes: {
                "Title": {
                    DataType: "String",
                    StringValue: "The Whistler"
                },
                "Author": {
                    DataType: "String",
                    StringValue: "beadrock-bank-statement"
                },
                "WeeksOn": {
                    DataType: "Number",
                    StringValue: "6"
                }
            },
            MessageBody: JSON.stringify(msgData),
            QueueUrl: process.env.BANK_STATEMENT_QUEUE
        };

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        });

    } catch (e) {
        console.log(e);
    }

    callback(null, responses._200({ msg: "Bank statement request queue by customer id " }));
}