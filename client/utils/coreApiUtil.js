var Dispatcher = require('../Dispatcher');
var request = require('superagent');
var config = require('../config');
var ActionTypes = require('../constants/ActionTypes');

var appUrl = config.services.api.protocol + config.services.api.host;

var api = {
    startGame: {
        retrieve: function(game_identifier) {
            request
                .get(appUrl + '/player')
                .query({ game_identifier: game_identifier })
                .end(function(error, res) {
                	request
	                	.get(appUrl + '/board')
	                	.query({ game_identifier: res.body.game_identifier })
	                    .end(function(error, res) {
	                    	var board = res.body.board;
	                        Dispatcher.dispatch({
	                            type: ActionTypes.actionTypes.SET_BOARD,
	                            payload: board 
	                        });	
	                    });
                });
        }
    }
};

module.exports = api;
