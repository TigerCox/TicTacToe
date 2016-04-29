var Dispatcher = require('../Dispatcher');
var request = require('superagent');
var config = require('../config');
var ActionTypes = require('../constants/ActionTypes');

var appUrl = config.services.api.protocol + config.services.api.host;

var api = {
    setPosition: {
        retrieve: function(params, callback) {
            request
                .post(appUrl + '/set')
                .send(params)
                .end(function(error, res) {
                    Dispatcher.dispatch({
                        type: ActionTypes.actionTypes.SET_BOARD,
                        payload: res.board 
                    });
                });
        }
    },
    startGame: {
        retrieve: function(callback) {
            request
                .get(appUrl + '/board')
                .end(function(error, res) {
                	var board = res.body.board;
                    Dispatcher.dispatch({
                        type: ActionTypes.actionTypes.SET_BOARD,
                        payload: board 
                    });	
                });
        }
    }
};

module.exports = api;
