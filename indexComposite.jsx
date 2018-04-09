 var App= React.createClass({
 	getDefaultProps:function()
 	{
 		return {txt:'yellow',cat:1	}
 	},
 	getInitialState:function()
 	{
 		return {name:'Nil',id:1,red:0,green:0,blue:0}
 	},
 	update:function(e)
 	{
   	this.setState({	
        red: this.refs.red.refs.range.getDOMNode().value,	
        green: this.refs.green.refs.range.getDOMNode().value,	
        blue:this.refs.blue.refs.range.getDOMNode().value	})
 	},
propTypes:{
	txt:React.PropTypes.string,
	cat:React.PropTypes.number.isRequired,
},
 	render:function()
 	{
	
     return ( <div>
     	

     	<Slider ref="red" txt={this.state.red} update={this.update} />
    
		<Slider ref="green" txt={this.state.green} update={this.update} />
        <Slider ref="blue" txt={this.state.blue} update={this.update} />
		<h1>{this.props.cat}</h1>
     	<b>bold</b>
     	</div>)

 	}
 });

 
 var Slider=React.createClass({
 	render:function()
 	{

     return ( 
    <div>
     	<input type="range" ref="range" min="0" max="255" onChange={this.props.update} />
    <h2>{this.props.txt}</h2>
     </div>
     	)

 	}
 });
 var Widget=React.createClass({
 	render:function()
 	{

     return ( <div>
    
     	<input type="text" onChange={this.props.update} />
     	<h2>{this.props.txt}</h2>
     
     	</div>)

 	}
 });
      React.render( <App txt="zeesha" cat={0} />, document.getElementById('content')); 
