var React = require('react/addons');
var Container = require('flux/utils').Container;

var ReactPropTypes = React.PropTypes;

//Stores
var BoardStore = require('../stores/BoardStore'); 

var AppUI = React.createClass({
    propTypes: {
        board: ReactPropTypes.array
    },

    render: function() {
        return (
    		<table>
            	<tr>
            		<td>{this.props.board[0][0]}</td>
            		<td>{this.props.board[0][1]}</td>
            		<td>{this.props.board[0][2]}</td>
        		</tr>
            	<tr>
	        		<td>{this.props.board[1][0]}</td>
	        		<td>{this.props.board[1][1]}</td>
	        		<td>{this.props.board[1][2]}</td>
        		</tr>
        		<tr>
		    		<td>{this.props.board[2][0]}</td>
		    		<td>{this.props.board[2][1]}</td>
		    		<td>{this.props.board[2][2]}</td>
	    		</tr>
            </table>
        );
    }
});

class AppContainer extends React.Component {
    static getStores() {
        return [BoardStore];
    }

    static calculateState() {
        return {
            board: BoardStore.get().board
        };
    }

    render() {
        return (
            <AppUI 
                board={this.state.board}
            />
        );
    }
}

module.exports = Container.create(AppContainer);
