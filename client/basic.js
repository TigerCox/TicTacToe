var React = require('react/addons');
var routes = require('./routes/app');
var coreApi = require('./utils/coreApiUtil');

const _appRoot = document.querySelector('[data-component=app]');
React.render(routes, _appRoot);
coreApi.startGame.retrieve(function(){});
