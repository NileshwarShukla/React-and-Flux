 var Reactmixin={
    
    componentWillMount:function()
    {

      console.log("will Mount")
    },
    getInitialState:function()
    {

     return ({count:0})
    },
 increment:function()
    {

     this.setState({count:this.state.count+1})
    }
 }




 var App= React.createClass({

  	render:function()
 	{

     return (
     <div>
     <ButtonComp txt="button" />
     <InputComp txt="input" />
     </div>)
 	},

 });
 var ButtonComp= React.createClass({
    mixins:[Reactmixin],
    render:function()
  {

     return (
     <div>
     <input type="button" onClick={this.increment} value={this.props.txt +'-'+ this.state.count}></input>
     
     </div>)
  } });
 var InputComp= React.createClass({
    mixins:[Reactmixin],
    render:function()
  {

     return (
     <div>
     <input type="text"  onClick={this.increment}  value={this.props.txt +'-'+ this.state.count}></input>
     
     </div>)
  }
   });

React.render( <App val={0} />, document.getElementById('content')); 

