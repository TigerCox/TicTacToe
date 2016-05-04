var Dispatcher = require('../Dispatcher');
var request = require('superagent');
var config = require('../config');
var ActionTypes = require('../constants/ActionTypes');

var appUrl = config.services.api.protocol + config.services.api.host;

var api = {
    startGame: {
        retrieve: function(game_identifier) {
        	window.sessionStorage.setItem('game_identifier', game_identifier);
            request
                .get(appUrl + '/player')
                .query({ game_identifier: game_identifier })
                .end(function(error, res) {
                	window.sessionStorage.setItem('player_identifier', res.body.player_identifier);
                	boardRequest(res.body.game_identifier);
                });
            window.setInterval(function() {
	            	var game_identifier = window.sessionStorage.getItem('game_identifier');
	            	boardRequest(game_identifier, checkWinner);
            	},
            	500
            );
        }
    },
    setPosition: {
    	retrieve: function(params) {
    		var game_identifier = window.sessionStorage.getItem('game_identifier');
    		var player_identifier = window.sessionStorage.getItem('player_identifier');
    		var apiParams = {
    			'player_identifier': player_identifier,
    			'x': params.row,
    			'y': params.column
    		};
    		request
    			.post(appUrl + '/set')
    			.query({ game_identifier: game_identifier })
    			.send(apiParams)
                .end(function(error, res) {
                    Dispatcher.dispatch({
                        type: ActionTypes.actionTypes.SET_BOARD,
                        payload: res.body.board 
                    });
                    checkWinner(res.body);
                });
    	}
    }
};

var boardRequest = function(game_identifier, callback) {
	request
		.get(appUrl + '/board')
		.query({ game_identifier: game_identifier })
		.end(function(error, res) {
			var board = res.body.board;
		    Dispatcher.dispatch({
		        type: ActionTypes.actionTypes.SET_BOARD,
		        payload: board 
		    });
		    if (callback !== undefined) {
			    callback(res.body);
		    }
		});
}

var checkWinner = function(data) {
    if (data.hasOwnProperty('winner')) {
        Dispatcher.dispatch({
            type: ActionTypes.actionTypes.GAME_RESULT,
            payload: data.winner
        });
    }
}

module.exports = api;
