var Hapi = require('hapi');
var WebpackPlugin  = require('hapi-webpack-plugin');
var routes = require('./routes');
var Config = require('./config');
var server = new Hapi.Server();

server.settings.maxSockets = 300;
server.settings.connections.routes.state.failAction = 'ignore';
server.connection(Config.connection);
server.route(routes);

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