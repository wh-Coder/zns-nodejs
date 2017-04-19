const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var server = http.createServer((req, res) => {
    var str = '';
    req.on('data', (data) => {
        str += data;
    });
    req.on('end', () => {
        var obj = urlLib.parse(req.url, true);

        const url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse(str);

        var file_name = './www' + url;
        fs.readFile(file_name, (err, data) => {
            if (err) {
                res.write('404');
            } else {
                res.write(data)
            }
            res.end()
        });
        console.log(url, GET, POST);
    })
});

server.listen(7777);

console.log('http://localhost:7777');
