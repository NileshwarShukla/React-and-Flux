var AppConstants=require('./app-constants.jsx');
var AppDispatcher=require('./app-dispatcher.jsx');

var AppActions={
	
	addItem:function(item)
	{
	AppDispatcher.handleViewAction({
      actionType:AppConstants.ADD_ITEM,
      item:item
	})
	},
	removeItem:function(index)
	{
	AppDispatcher.handleViewAction({
      actionType:AppConstants.REMOVE_ITEM,
      index:index 
	})
	},
	decreaseItem:function(index)
	{
	AppDispatcher.handleViewAction({
      actionType:AppConstants.DECREASE_ITEM,
      index:index 
	})
	},
	increaseItem:function(index)
	{
	AppDispatcher.handleViewAction({
      actionType:AppConstants.INCREASE_ITEM,
      index:index 
	})
	}
}
module.exports=AppActions;