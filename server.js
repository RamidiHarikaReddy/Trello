var http = require('http'),
    fs = require('fs'),
    finalhandler = require('finalhandler'),
    serveStatic = require('serve-static'),
    serve = serveStatic(".");

var https = require('https');
var options = {
    key: fs.readFileSync('privateKey.key'),
    cert: fs.readFileSync('certificate.crt')
};
https.createServer(options, function (req, res) {
	if(req.url.lastIndexOf("/trello/") >=0) {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(fs.readFileSync(__dirname + "/html/index.html"));
	} else {
		console.log('Serving asset', req.url);
		var done = finalhandler(req, res);
		serve(req, res, done);
	}
}).listen(9000);