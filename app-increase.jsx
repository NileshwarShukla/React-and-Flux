var React=require('react');
var AppActions=require('./app-actions.jsx');

var Increase=React.createClass({
	
	handleClick:function()
	{
	AppActions.increaseItem(this.props.index);
	},
	render:function()
	{
	 return <button onClick={this.handleClick}>+</button>
	 }
});
module.exports=Increase;