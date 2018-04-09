 var App= React.createClass({
 	
 	render:function()
 	{
	
     return ( <div>
     	       <BButton href="javascript:alert('blue')" className="btn-primary"> <BIcon className="glyphicon-heart"/> React</BButton>
               <BButton href="javascript:alert('green')" className="btn-success"> <BIcon className="glyphicon-pencil"/> React</BButton>
               <BButton href="javascript:alert('red')" className="btn-danger"> <BIcon className="glyphicon-inbox"/> React</BButton>
     	      </div>)

 	}
 });

 
 var BButton=React.createClass({
 	render:function()
 	{

     return (    this.transferPropsTo( <a className="btn" >{this.props.children}</a>) 
     	)

 	}
 });
var BIcon=React.createClass({
    render:function()
    {

     return ( 
    this.transferPropsTo(<span className="glyphicon"></span>)
        )

    }
 });
      React.render( <App txt="zeesha" cat={0} />, document.getElementById('content')); 
