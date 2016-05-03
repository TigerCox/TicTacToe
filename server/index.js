var Hapi = require('hapi');
var WebpackPlugin  = require('hapi-webpack-plugin');
var routes = require('./routes');
var Config = require('./config');
var board = require('./board/board');
var io = require('socket.io');
var server = new Hapi.Server();

server.settings.maxSockets = 300;
server.settings.connections.routes.state.failAction = 'ignore';
server.connection(Config.connection);
server.route(routes);


var socket = io(server.listener);

//Send current time to all connected clients
function sendTime() {
	socket.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

socket.on('connection', function (socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);
});

server.register({
	register: WebpackPlugin,
	options: './webpack.config.js'
}, function(error) {
	if (error) {
		return console.error(error);
	}
	server.start(function() { console.log('Server running at:', server.info.uri) });
});

module.exports = server;