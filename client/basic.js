var React = require('react/addons');
var routes = require('./routes/app');
var coreApi = require('./utils/coreApiUtil');

const _appRoot = document.querySelector('[data-component=app]');
React.render(routes, _appRoot);

coreApi.startGame.retrieve(getGameIdentifier());

function getGameIdentifier() {
	var queryString = window.location.href.substring( window.location.href.indexOf('?') + 1 );
	var params = queryString.split('=');
	var gameIdentifier = params[1].split('#')[0];
	return gameIdentifier;
}