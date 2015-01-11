var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({ port: 8080 });
var clients = [];

wss.on('connection', function connection(ws) {
    console.log('websocket connected');
    var path = ws.upgradeReq.url.split('/');

    clients.push(path[1]);

    ws.on('message', function(message) {
        ws.send(message);
    });

    ws.on('close', function() {
        console.log('connection closed');
    });

    ws.on('error', function(err) {
        console.error(err);
    });
});
