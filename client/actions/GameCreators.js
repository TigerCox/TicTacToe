var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var coreApi = require('../utils/coreApiUtils');
var createActions = require('createActions');

var actionCreators = {
    setBoard: function() {
        Dispatcher.dispatch({
            type: ActionTypes.SET_BOARD,
            payload: [[0,0,0],[0,0,0][0,0,0]] 
        });
    },
    setPosition: function() {
        Dispatcher.dispatch({
            type: ActionTypes.SET_POSITION
            payload: [0][0]
        });
     }
};

module.exports = actionCreators = createActions(actionCreators);
