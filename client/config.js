
var config = module.exports = {};

config.protocol = 'http://';
config.host = 'localhost';
config.port = '8888';

config.services = {
	    api: {
	        protocol: config.protocol,
	        host: config.host + ":" + config.port,
	    }
};