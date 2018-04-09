var React=require('react');
//var AppActions=require('./app-actions.js');
var Cart=require('./app-cart.jsx')
var Catalog=require('./app-catalog.jsx');
var Router=require('react-router-component');

var CatalogDetail=require('./app-catalogdetail.jsx');
var Template=require('./app-template.jsx')
var Locations=React.createFactory(Router.Locations);//Router.Locations;

var Location=React.createFactory(Router.Location);
var Route=require('react-router-component').Route;

var APP=React.createClass({
	
	handleClick:function()
	{
	AppActions.addItem('this is the item');
	},
	/*render:function()
	{
	 return <h1 onClick={this.handleClick}>MY FLUX APP</h1>
	 }*/
	/* return <div>
	 <h1>Lets Shop</h1>
	 <Catalog />
	 <h1>Cart</h1>
	 <Cart />
	 </div> */
render:function()
	{
	 return (
             //  <Template>
              Locations([
             
              
              Location({ path:"/" component:{Catalog} })
               Location({   path:"/cart" component:{Cart} })
               Location({  path:"/item/:item" component:{CatalogDetail} })
          ])
              
               //   </Router>
                   //</Locations>
               //</Template>
	 	)

	 }
});

React.render(<APP />,document.getElementById('content'));
//module.exports=APP;