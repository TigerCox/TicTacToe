var coreApi = require('../utils/coreApiUtil');
var createActions = require('../utils/createActions');

var actionCreators = {
	setPosition: function(data) {
		coreApi.setPosition.retrieve(data);
	}
};

module.exports = actionCreators = createActions(actionCreators);