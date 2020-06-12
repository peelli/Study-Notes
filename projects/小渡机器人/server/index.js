var http = require('http');
var url = require('url');
var fs = require('fs');
var req = require('request');
http.createServer(function (request, response) {
    console.log('服务已起动');
    var pathName = url.parse(request.url).pathname;
    var params = url.parse(request.url, true).query;
    console.log('methods', request.method);
    console.log('header:', request.headers)
    if (pathName == '/chat') {
        var data = {
            "reqType": 0,
            "perception": {
                "inputText": {
                    "text": params.text
                }
            },
            "userInfo": {
                "apiKey": "d3789586ddba4b7fbbf4699006ce7c49",
                "userId": "123456"
            }
        }
        var contents = JSON.stringify(data);
        req({
            url: "http://openapi.tuling123.com/openapi/api/v2",
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: contents
        }, function (error, resp, body) {

            if (!error && resp.statusCode == 200) {
                var head = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT",
                    "Access-Control-Allow-Headers": "x-requested-with , content-type, token",
                    "Content-Type": 'application/json'
                }
                response.writeHead(200, head);
                var obj = JSON.parse(body);
                if (obj && obj.results && obj.results.length > 0 && obj.results[0].values) {
                    response.write(JSON.stringify(obj.results[0].values));
                    response.end();
                } else {
                    response.write("{\"text\":\"布吉岛你说的是什么~\"}");
                    response.end();
                }
            } else {
                response.writeHead(400);
                response.write("数据异常");
                response.end();
            }
        });
    } else {
        try {
            var file = fs.readFileSync('/view' + pathName);
            response.writeHead(200);
            response.write(file);
            response.end();
        } catch (e) {
            console.log(e)
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>");
            response.end();
        }
    }
}).listen(3000);