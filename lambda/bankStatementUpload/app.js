const responses = require('./api-responses');

exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.debug('payload', JSON.stringify(event));

    callback(null, responses._200({ msg: "Bank statement upload " }));
}