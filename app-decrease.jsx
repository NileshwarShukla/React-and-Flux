var React=require('react');
var AppActions=require('./app-actions.jsx');

var Decrease=React.createClass({
	
	handleClick:function()
	{
	AppActions.decreaseItem(this.props.index);
	},
	render:function()
	{
	 return <button onClick={this.handleClick}>-</button>
	 }
});
module.exports=Decrease;