var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var hostname = '127.0.0.1';
var port = 3000;
 
// Serve up public folder 
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});
const myURL = new URL('http://127.0.0.1:3000/');
// Create server 

// Create server 
var server = http.createServer(function onRequest (req, res) {
  var reqURL = myURL.parse(req.url, true);
  if (reqURL.pathname === '/artist') {
    res.statusCode = 200;
    res.end("Hi! I am not a file from your filesystem. This is good.");
  } else {
    serve(req, res, finalhandler(req, res)); // <---- unveränderter Aufruf von vorher
  }
})

// Listen starts the actual server on the specified port
server.listen(3000);

console.log("Test");