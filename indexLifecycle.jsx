 var App= React.createClass({
 	update:function()
  {
    var newVal=this.props.val+1
    this.setProps({val:newVal})

  },
  componentWillMount:function()
  {this.setState({m:2});
   if(this.props.val===0)
   {
    this.btnStyle={'color':'red'}
   }
    console.log('here I go')
  },
  componentDidMount:function(rootNode)
  {
    console.log('componentDidMount')
       console.log(this.getDOMNode())
    console.log(rootNode)
    this.inc=setInterval(this.update,500)
  },
  componentWillUnmount:function()
  {
    console.log('goodbye cruel world!')
    clearInterval(this.inc)
  },
 	render:function()
 	{
	   console.log("hello world")
     return <button 
     style={this.btnStyle} 
     onClick={this.update}>
     {this.props.val*this.state.m}
     </button>
 	},
 });
window.render=function()
{
React.render( <App val={0} />, document.getElementById('content')); 

}
window.unmount=function()
{
React.unmountComponentAtNode(document.getElementById('content')); 
  
}
 

      
 