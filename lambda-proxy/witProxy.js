'use strict';
const authHeader = "Bearer " + process.env.WITAI_API_KEY;
var request = require('request');
const witProxy = function(event, context, callback) {
    var witUrl = "https://api.wit.ai/converse?v=20170208&q=hello&session_id=abclol";
    if (event !== undefined && event.queryStringParameters !== undefined && event.queryStringParameters.message !== undefined && event.queryStringParameters.session_id !== undefined){
        witUrl = "https://api.wit.ai/converse?v=20170208&q=" + event.queryStringParameters.message + "&session_id=" + event.queryStringParameters.session_id;
    } else {
        callback("No message and/or session_id", null);
    }
    var headers = {
        "Authorization": authHeader,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    request.post({ url: witUrl, headers: headers }, 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const witResponse = {
                statusCode: 200,
                headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                body: body
            };
            callback(null, witResponse);
        } else {
            const witResponse = {
                statusCode: response.statusCode,
                headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                body: body
            };
            callback(error, witResponse);
        }
    })
};

(()=>{
    witProxy(undefined, undefined, function (err, res){
        console.log("Error:", JSON.stringify(err));
        console.log("Response:", JSON.stringify(res));
    });
})();

exports.handler = witProxy;