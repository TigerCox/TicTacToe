var React = require('react/addons');
var Container = require('flux/utils').Container;
var GameActionCreator = require('../actions/GameActionCreator');

var ReactPropTypes = React.PropTypes;

//Stores
var BoardStore = require('../stores/BoardStore'); 

var AppUI = React.createClass({
    propTypes: {
        board: ReactPropTypes.array,
        result: ReactPropTypes.number
    },

    render: function() {
    	if (this.props.hasOwnProperty('result')) {
    		
    	}
        return (
    		<div>
	    		<table>
	            	<tr>
	            		<td><button onClick={this._select} data-column="0" data-row="0">{this.props.board[0][0]}</button></td>
	            		<td><button onClick={this._select} data-column="1" data-row="0">{this.props.board[0][1]}</button></td>
	            		<td><button onClick={this._select} data-column="2" data-row="0">{this.props.board[0][2]}</button></td>
	        		</tr>
	            	<tr>
		        		<td><button onClick={this._select} data-column="0" data-row="1">{this.props.board[1][0]}</button></td>
		        		<td><button onClick={this._select} data-column="1" data-row="1">{this.props.board[1][1]}</button></td>
		        		<td><button onClick={this._select} data-column="2" data-row="1">{this.props.board[1][2]}</button></td>
	        		</tr>
	        		<tr>
		        		<td><button onClick={this._select} data-column="0" data-row="2">{this.props.board[2][0]}</button></td>
		        		<td><button onClick={this._select} data-column="1" data-row="2">{this.props.board[2][1]}</button></td>
		        		<td><button onClick={this._select} data-column="2" data-row="2">{this.props.board[2][2]}</button></td>
		    		</tr>
	            </table>
	            {this.props.result == null ? null : <div>Winner: {this.props.result}</div>}
            </div>
        );
    },
    
    _select: function(event) {
    	var column = event.target.getAttribute("data-column");
    	var row = event.target.getAttribute("data-row")
    	var data = {
			'column': column,
			'row': row
		}
    	GameActionCreator.setPosition(data);
    }
});

class AppContainer extends React.Component {
    static getStores() {
        return [BoardStore];
    }

    static calculateState() {
        return {
            board: BoardStore.get().board,
            result: BoardStore.get().result 
        };
    }

    render() {
        return (
            <AppUI 
                board={this.state.board}
            	result={this.state.result}
            />
        );
    }
}

module.exports = Container.create(AppContainer);
