 var App= React.createClass({
 	update:function()
  {
    var newVal=this.props.val+1
    this.setProps({val:newVal})

  },
 getInitialState:function()
 {
  return {increasing:false}
 },
 componentWillReceiveProps:function(nextProps) //on setting state here component won't render
 { console.log('componentWillReceiveProps')
this.setState({increasing:nextProps.val>this.props.val})
 },
  shouldComponentUpdate:function(nextProps,nextState) //on false component won't render,but state property update
 { 
  return nextProps.val%5===0
 },
 componentWillUpdate:function(nextProps,nextState) //on setting state here component won't render
 {
  console.log('componentWillUpdate')
  console.log(JSON.stringify(nextProps))
 },
 	render:function()
 	{
console.log(this.state.increasing)
     return <button 
    
     onClick={this.update}>
     {this.props.val}
     </button>
 	},
  componentDidUpdate:function(prevProps,prevState,rootNode) //calls after render
 {
  console.log('componentDidUpdate')
  console.log(JSON.stringify(prevProps))
 },
 });

React.render( <App val={0} />, document.getElementById('content')); 

