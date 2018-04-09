 var App= React.createClass({
 	getDefaultProps:function()
 	{
 		return {

 			txt:'yellow',
 			cat:1
 		}
 	},
 	getInitialState:function()
 	{
 		return {name:'Nil',id:1}
 	},
 	updateTxt:function(e)
 	{
        this.setState({name:this.state.name+e.target.value})

 	},
propTypes:{
	txt:React.PropTypes.string,
	cat:React.PropTypes.number.isRequired,
},
 	render:function()
 	{

     return ( <div>
     	<h1>{this.props.txt}</h1>

     	<Widget txt={this.state.name} update={this.updateTxt} />
     	<h1>{this.props.cat}</h1>
     	<b>bold</b>
     	</div>)

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
      ReactDOM.render( <App txt="zeesha" cat={0} />, document.getElementById('example')); 
