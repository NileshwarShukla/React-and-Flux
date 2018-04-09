/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React=__webpack_require__(1);
	//var AppActions=require('./app-actions.js');
	var Cart=__webpack_require__(2)
	var Catalog=__webpack_require__(19);
	var Router=__webpack_require__(21);

	var CatalogDetail=__webpack_require__(59);
	var Template=__webpack_require__(60)
	var Locations=React.createFactory(Router.Locations);//Router.Locations;

	var Location=React.createFactory(Router.Location);
	var Route=__webpack_require__(21).Route;

	var APP=React.createClass({displayName: "APP",
		
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
	             // <Locations>
	             React.createElement(Router, null, 
	              
	               React.createElement(Route, {path: "/", component: Catalog}), 
	               React.createElement(Route, {path: "/cart", component: Cart}), 
	               React.createElement(Route, {path: "/item/:item", component: CatalogDetail})
	          
	              
	                  )
	                   //</Locations>
	               //</Template>
		 	)

		 }
	});

	React.render(React.createElement(APP, null),document.getElementById('content'));
	//module.exports=APP;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */

	var React=__webpack_require__(1);
	var AppStore=__webpack_require__(3);
	var RemoveFromCart=__webpack_require__(15)
	var Increase=__webpack_require__(17)
	var Decrease=__webpack_require__(18)


	function CartItems()
	{

		return {items:AppStore.getCart()}
	}
	var Cart=React.createClass({displayName: "Cart",

	getInitialState:function()
	{
		return CartItems();
	},
	componentWillMount:function()
	{
		AppStore.addChangeListener(this._onChange)
	},
	_onChange:function()
	{
		this.setState(CartItems())
	},
	render:function()
	{
		var total=0;
		var items=this.state.items.map(function(item,i){
		    var subtotal=item.cost*item.qty;
		    total+=subtotal;
			return (
				React.createElement("tr", {key: i}, 
				React.createElement("td", null, React.createElement(RemoveFromCart, {index: i})), 
				React.createElement("td", null, item.title), 
				React.createElement("td", null, item.qty), 
				React.createElement("td", null, 
	              React.createElement(Increase, {index: i}), 
	              React.createElement(Decrease, {index: i})
				), 
				React.createElement("td", null, "$", subtotal)
				

				))

		})
		return (React.createElement("table", {className: "table table-hover"}, 
			
	          React.createElement("thead", null, 
	          React.createElement("tr", null, 
	          React.createElement("th", null), 
	          React.createElement("th", null, "Item"), 
	          React.createElement("th", null, "Qty"), 
	          React.createElement("th", null), 
	          React.createElement("th", null, "Subtotal")
	          )
	          ), 
	          React.createElement("tbody", null, 
			items
			), 
			React.createElement("tfoot", null, 
			React.createElement("tr", null, 
	          React.createElement("td", {colspan: "4", className: "text-right"}, "Total"), 
	          React.createElement("td", null, total)
			)
			)
			))
	}

	});
	module.exports=Cart;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var AppDispatcher = __webpack_require__(4);
	var AppConstants = __webpack_require__(13);
	var merge = __webpack_require__(11);
	var EventEmitter = __webpack_require__(14).EventEmitter;

	var CHANGE_EVENT="change";

	var _catalog=[];

	for(var i=1;i<9;i++)
	{

		_catalog.push({
			'id':'Widget'+i,
			'title':'Widget #'+i,
			'summary':'This is awesome wiget!',
			'description':'Test'+i,
			'img':'assets/product.png',
			'cost':i
		});
	}


	var _cartItems=[];

	function _removeItem(index)
	{
		_cartItems[index].inCart=false;
		_cartItems.splice(index,1);
	}
	function _increaseItem(index)
	{
		_cartItems[index].qty++;
		
	}


	function _decreaseItem(index)
	{
		if(_cartItems[index].qty>1)
		{
		_cartItems[index].qty--;
	     }
	     else
	     {
	     	_removeItem(index);
	     }
	}

	function _addItem(item)
	{
		if(item && !item.inCart)
		{

		item['qty']=1;
		item['inCart']=true;
		_cartItems.push(item);
	     }
	     else
	     {
	     	_cartItems.forEach(function(cartItem,i)

	     	{
	          if(cartItem.id==item.id)
	          {
	          	_increaseItem(i)
	          }

	     	});
	     	
	     }
	}

	var AppStore=merge(EventEmitter.prototype,{
	emitChange:function()
	{
		this.emit(CHANGE_EVENT)
	},
	addChangeListener:function(callback)
	{
		this.on(CHANGE_EVENT,callback)
	},
	removeChangeListener:function(callback)
	{
		this.removeListener(CHANGE_EVENT,callback)
	},
	getCart:function()
	{
		return _cartItems
	},
	getCatalog:function()
	{
		return _catalog;
	},
	dispatcherIndex:AppDispatcher.register(function(payload){
	var action=payload.action;
	console.log('dispatcherIndex',payload)
	switch(action.actionType)
	{
		case AppConstants.ADD_ITEM       :_addItem(payload.action.item); break;
		case AppConstants.REMOVE_ITEM    :_removeItem(payload.action.index); break;
		case AppConstants.INCREASE_ITEM  :_increaseItem(payload.action.index); break;
		case AppConstants.DECREASE_ITEM  :_decreaseItem(payload.action.index); break;
	}
	AppStore.emitChange();
	return true;

	})
	})
	module.exports=AppStore;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Dispatcher = __webpack_require__(5);
	var merge = __webpack_require__(11);

	var AppDispatcher = merge(Dispatcher.prototype,{
		
		handleViewAction:function(action)
		{
			console.log('action',action);
		this.dispatch({source:'VIEW_ACTION',action:action})
		}
	})

	module.exports=AppDispatcher;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Promise=__webpack_require__(6).Promise
	var merge= __webpack_require__(11)

	var _callbacks=[];
	var _promises=[];
	/**
	 * Add a promise to the queue of callback invocation promises.
	 * @param {function} callback The Store's registered callback.
	 * @param {object} payload The data from the Action.
	 */
	var _addPromise=function(callback,payload){
	  _promises.push(new Promise(function(resolve,reject)
	{
	  if(callback(payload)) {
	      resolve(payload);
	    }
	    else{
	       reject(new Error('Dispatcher callback unsuccessful'));
	    }
	}));

	};
	var _clearPromises = function() {
	  _promises = [];
	};
	var Dispatcher=function(){};
	Dispatcher.prototype =merge(Dispatcher.prototype,{

	/**
	   * Register a Store's callback so that it may be invoked by an action.
	   * @param {function} callback The callback to be registered.
	   * @return {number} The index of the callback within the _callbacks array.
	   */
	  register:function(callback){
	    _callbacks.push(callback);
	    return _callbacks.length-1;//index

	  },

	  /**
	   * dispatch
	   * @param  {object} payload The data from the action.
	   */
	   dispatch:function(payload)
	   {
	     _callbacks.forEach(function(callback)
	     {
	      _addPromise(callback,payload);
	     });
	     Promise.all(_promises).then(_clearPromises)

	   }
	})
	  // body...

	module.exports=Dispatcher;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(9);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	      var state = parent._state;

	      if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	        return this;
	      }

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	      var result = parent._result;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (Array.isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, this._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(10)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), (function() { return this; }()), __webpack_require__(8)(module)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule merge
	 */

	"use strict";

	var assign = __webpack_require__(12);

	/**
	 * Shallow merges two structures into a return value, without mutating either.
	 *
	 * @param {?object} one Optional object with properties to merge from.
	 * @param {?object} two Optional object with properties to merge from.
	 * @return {object} The shallow extension of one by two.
	 */
	var merge = function(one, two) {
	  return assign({}, one, two);
	};

	module.exports = merge;

	// deprecation notice
	console.warn(
	  'react/lib/merge has been deprecated and will be removed in the ' +
	  'next version of React. All uses can be replaced with ' +
	  'Object.assign({}, a, b) or _.extend({}, a, b).'
	);


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	};

	module.exports = assign;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports={
		
		ADD_ITEM:'ADD_ITEM',
		REMOVE_ITEM:'REMOVE_ITEM',
		INCREASE_ITEM:'INCREASE_ITEM',
		DECREASE_ITEM:'DECREASE_ITEM',
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React=__webpack_require__(1);
	var AppActions=__webpack_require__(16);

	var RemoveFromCart=React.createClass({displayName: "RemoveFromCart",
		
		handleClick:function()
		{
		AppActions.removeItem(this.props.index);
		},
		render:function()
		{
		 return React.createElement("button", {onClick: this.handleClick}, "x")
		 }
	});
	module.exports=RemoveFromCart;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var AppConstants=__webpack_require__(13);
	var AppDispatcher=__webpack_require__(4);

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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React=__webpack_require__(1);
	var AppActions=__webpack_require__(16);

	var Increase=React.createClass({displayName: "Increase",
		
		handleClick:function()
		{
		AppActions.increaseItem(this.props.index);
		},
		render:function()
		{
		 return React.createElement("button", {onClick: this.handleClick}, "+")
		 }
	});
	module.exports=Increase;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React=__webpack_require__(1);
	var AppActions=__webpack_require__(16);

	var Decrease=React.createClass({displayName: "Decrease",
		
		handleClick:function()
		{
		AppActions.decreaseItem(this.props.index);
		},
		render:function()
		{
		 return React.createElement("button", {onClick: this.handleClick}, "-")
		 }
	});
	module.exports=Decrease;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React=__webpack_require__(1);

	var AppStore=__webpack_require__(3);
	var AddToCart=__webpack_require__(20);

	function getCatalog()
	{

		return {items:AppStore.getCatalog()}
	}
	var Catalog=React.createClass({displayName: "Catalog",

	getInitialState:function()
	{
		return getCatalog();
	},
	render:function()
	{
		var items=this.state.items.map(function(item){
			return (React.createElement("tr", null, React.createElement("td", null, item.title), React.createElement("td", null, "$", item.cost), React.createElement("td", null, React.createElement(AddToCart, {item: item}))))

		})
		return (React.createElement("table", {className: "table table-hover"}, items))
	}

	});
	module.exports=Catalog;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React=__webpack_require__(1);
	var AppActions=__webpack_require__(16);

	var AddToCart=React.createClass({displayName: "AddToCart",
		
		handleClick:function()
		{
		AppActions.addItem(this.props.item);
		},
		render:function()
		{
		 return React.createElement("button", {onClick: this.handleClick}, "Add to cart")
		 }
	});
	module.exports=AddToCart;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Router                    = __webpack_require__(22);
	var Route                     = __webpack_require__(54);
	var Link                      = __webpack_require__(55);

	var RouterMixin               = __webpack_require__(23);
	var RouteRenderingMixin       = __webpack_require__(53);

	var NavigatableMixin          = __webpack_require__(56);

	var environment               = __webpack_require__(34);

	var CaptureClicks             = __webpack_require__(57);

	var URLPattern                = __webpack_require__(27);

	var exportsObject = {
	  Locations: Router.Locations,
	  Pages: Router.Pages,

	  Location: Route.Route,
	  Page: Route.Route,
	  NotFound: Route.NotFound,

	  Link: Link,

	  environment: environment,

	  RouterMixin: RouterMixin,
	  RouteRenderingMixin: RouteRenderingMixin,

	  NavigatableMixin: NavigatableMixin,
	  CaptureClicks: CaptureClicks
	};

	module.exports = exportsObject;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React                     = __webpack_require__(1);
	var RouterMixin               = __webpack_require__(23);
	var RouteRenderingMixin       = __webpack_require__(53);
	var assign                    = Object.assign || __webpack_require__(25);

	/**
	 * Create a new router class
	 *
	 * @param {String} name
	 * @param {ReactComponent} component
	 */
	function createRouter(name, component) {

	  return React.createClass({

	    mixins: [RouterMixin, RouteRenderingMixin],

	    displayName: name,

	    getRoutes: function(props) {
	      return props.children;
	    },

	    getDefaultProps: function() {
	      return {
	        component: component
	      };
	    },

	    render: function() {
	      // Render the Route's handler.
	      var handler = this.renderRouteHandler(this.props.childProps);

	      if (!this.props.component) {
	        return handler;
	      } else {
	        // Pass all props except this component to the Router (containing div/body) and the children,
	        // which are swapped out by the route handler.
	        var props = assign({}, this.props);
	        delete props.component;
	        delete props.children;
	        delete props.childProps;
	        return React.createElement(this.props.component, props, handler);
	      }
	    }
	  });
	}

	module.exports = {
	  createRouter: createRouter,
	  Locations: createRouter('Locations', 'div'),
	  Pages: createRouter('Pages', 'body')
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React         = __webpack_require__(1);
	var invariant     = __webpack_require__(24);
	var assign        = Object.assign || __webpack_require__(25);
	var matchRoutes   = __webpack_require__(26);
	var Environment   = __webpack_require__(34);

	var RouterMixin = {
	  mixins: [Environment.Mixin],

	  propTypes: {
	    path: React.PropTypes.string,
	    contextual: React.PropTypes.bool,
	    onBeforeNavigation: React.PropTypes.func,
	    onNavigation: React.PropTypes.func,
	    urlPatternOptions: React.PropTypes.oneOfType([
	      React.PropTypes.arrayOf(React.PropTypes.string),
	      React.PropTypes.object
	    ])
	  },

	  childContextTypes: {
	    router: React.PropTypes.any
	  },

	  getChildContext: function() {
	    return {
	      router: this
	    };
	  },

	  contextTypes: {
	    router: React.PropTypes.any
	  },

	  getInitialState: function() {
	    return this.getRouterState(this.props);
	  },

	  componentWillReceiveProps: function(nextProps) {
	    var nextState = this.getRouterState(nextProps);
	    this.delegateSetRoutingState(nextState);
	  },

	  getRouterState: function(props) {
	    var path;
	    var prefix;

	    var parent = props.contextual && this.getParentRouter();

	    if (parent) {

	      var parentMatch = parent.getMatch();

	      invariant(
	        props.path ||
	        isString(parentMatch.unmatchedPath) ||
	        parentMatch.matchedPath === parentMatch.path,
	        "contextual router has nothing to match on: %s", parentMatch.unmatchedPath
	      );

	      path = props.path || parentMatch.unmatchedPath || '/';
	      prefix = parent.state.prefix + parentMatch.matchedPath;
	    } else {

	      path = props.path || this.getEnvironment().getPath();

	      invariant(
	        isString(path),
	        ("router operate in environment which cannot provide path, " +
	         "pass it a path prop; or probably you want to make it contextual")
	      );

	      prefix = '';
	    }

	    if (path[0] !== '/') {
	      path = '/' + path;
	    }

	    var match = matchRoutes(this.getRoutes(props), path, this.getURLPatternOptions());

	    return {
	      match: match,
	      matchProps: match.getProps(),
	      handler: match.getHandler(),
	      prefix: prefix,
	      navigation: {}
	    };
	  },

	  getEnvironment: function() {
	    if (this.props.environment) {
	      return this.props.environment;
	    }
	    if (this.props.hash) {
	      return Environment.hashEnvironment;
	    }
	    if (this.props.contextual && this.context.router) {
	      return this.context.router.getEnvironment();
	    }
	    return Environment.defaultEnvironment;
	  },

	  /**
	   * Return parent router or undefined.
	   */
	  getParentRouter: function() {
	    var current = this.context.router;
	    var environment = this.getEnvironment();

	    if (current) {
	      if (current.getEnvironment() === environment) {
	        return current;
	      }
	    }
	  },

	  /**
	   * Return current match.
	   */
	  getMatch: function() {
	    return this.state.match;
	  },

	  getURLPatternOptions: function() {
	    var parent = this.getParentRouter();
	    var parentOptions = parent && parent.getURLPatternOptions();
	    // Check existence so we don't return an empty object if there are no options.
	    if (parentOptions) {
	      return assign({}, this.props.urlPatternOptions, parentOptions);
	    }
	    return this.props.urlPatternOptions;
	  },

	  /**
	   * Make href scoped for the current router.
	   */
	  makeHref: function(href) {
	    return join(this.state.prefix, href);
	  },

	  /**
	   * Navigate to a path
	   *
	   * @param {String} path
	   * @param {Function} navigation
	   * @param {Callback} cb
	   */
	  navigate: function(path, navigation, cb) {
	    path = join(this.state.prefix, path);
	    this.getEnvironment().setPath(path, navigation, cb);
	  },

	  /**
	   * Set new path.
	   *
	   * This function is called by environment.
	   *
	   * @private
	   *
	   * @param {String} path
	   * @param {Function} navigation
	   * @param {Callback} cb
	   */
	  setPath: function(path, navigation, cb) {
	    var match = matchRoutes(this.getRoutes(this.props), path, this.getURLPatternOptions());

	    var state = {
	      match: match,
	      matchProps: match.getProps(),
	      handler: match.getHandler(),
	      prefix: this.state.prefix,
	      navigation: navigation
	    };

	    assign(navigation, {match: match});

	    if (this.props.onBeforeNavigation &&
	        this.props.onBeforeNavigation(path, navigation) === false) {
	      return;
	    }

	    if (navigation.onBeforeNavigation &&
	        navigation.onBeforeNavigation(path, navigation) === false) {
	      return;
	    }

	    this.delegateSetRoutingState(state, function() {
	      if (this.props.onNavigation) {
	        this.props.onNavigation(path, navigation);
	      }
	      cb();
	    }.bind(this));
	  },

	  /**
	   * Return the current path
	   */
	  getPath: function () {
	    return this.state.match.path;
	  },

	  /**
	   * Try to delegate state update to a setRoutingState method (might be provided
	   * by router itself) or use replaceState.
	   */
	  delegateSetRoutingState: function(state, cb) {
	    if (this.setRoutingState) {
	      this.setRoutingState(state, cb);
	    } else {
	      this.setState(state, cb);
	    }
	  }

	};

	function join(a, b) {
	  return (a + b).replace(/\/\//g, '/');
	}

	function isString(o) {
	  return Object.prototype.toString.call(o) === '[object String]';
	}

	module.exports = RouterMixin;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var __ENV__ = process.env.NODE_ENV; // env lookup is slow in Node
	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (__ENV__ !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var URLPattern = __webpack_require__(27);
	var invariant = __webpack_require__(24);
	var warning = __webpack_require__(29);
	var React = __webpack_require__(1);
	var assign = Object.assign || __webpack_require__(25);
	var qs = __webpack_require__(30);

	var patternCache = {};

	/**
	 * Match routes against a path
	 *
	 * @param {Array.<Route>}  routes                  Available Routes.
	 * @param {String}         path                    Path to match.
	 * @param {[Object|Array]} routerURLPatternOptions URLPattern options from parent router (and its parent and so on).
	 */
	function matchRoutes(routes, path, routerURLPatternOptions) {
	  var match, page, notFound, queryObj, urlPatternOptions;

	  if (!Array.isArray(routes)) {
	    routes = [routes];
	  }

	  path = path.split('?');
	  var pathToMatch = path[0];
	  var queryString = path[1];
	  if (queryString) {
	    queryObj = qs.parse(queryString);
	  }

	  for (var i = 0, len = routes.length; i < len; i++) {
	    var current = routes[i];
	    // Simply skip null or undefined to allow ternaries in route definitions
	    if (!current) continue;

	    invariant(
	      current.props.handler !== undefined && current.props.path !== undefined,
	      "Router should contain either Route or NotFound components as routes");

	    if (current.props.path) {
	      // Allow passing compiler options to url-pattern, see
	      // https://github.com/snd/url-pattern#customize-the-pattern-syntax
	      // Note that this blows up if you provide an empty object on a regex path
	      urlPatternOptions = null;
	      if (Array.isArray(current.props.urlPatternOptions) || current.props.path instanceof RegExp) {
	        // If an array is passed, it takes precedence - assumed these are regexp keys
	        urlPatternOptions = current.props.urlPatternOptions;
	      } else if (routerURLPatternOptions || current.props.urlPatternOptions) {
	        urlPatternOptions = assign({}, routerURLPatternOptions, current.props.urlPatternOptions);
	      }

	      // matchKeys is deprecated
	      // FIXME remove this block in next minor version
	      if(current.props.matchKeys) {
	        urlPatternOptions = current.props.matchKeys;
	        warning(false,
	          '`matchKeys` is deprecated; please use the prop `urlPatternOptions` instead. See the CHANGELOG for details.');
	      }

	      var cacheKey = current.props.path + (urlPatternOptions ? JSON.stringify(urlPatternOptions) : '');

	      var pattern = patternCache[cacheKey];
	      if (!pattern) {
	        pattern = patternCache[cacheKey] = new URLPattern(current.props.path, urlPatternOptions);
	      }

	      if (!page) {
	        match = pattern.match(pathToMatch);
	        if (match) {
	          page = current;
	        }

	        // Backcompat fix in 0.27: regexes in url-pattern no longer return {_: matches}
	        if (match && current.props.path instanceof RegExp && !match._ && Array.isArray(match)) {
	          match = {_: match};
	        }

	        // Backcompat fix; url-pattern removed the array wrapper on wildcards
	        if (match && match._ && !Array.isArray(match._)) {
	          match._ = [match._];
	        }

	      }
	    }
	    if (!notFound && current.props.path === null) {
	      notFound = current;
	    }
	  }

	  return new Match(
	    pathToMatch,
	    page ? page : notFound ? notFound : null,
	    match,
	    queryObj
	  );
	}

	/**
	 * Match object
	 *
	 * @private
	 */
	function Match(path, route, match, query) {
	  this.path = path;
	  this.route = route;
	  this.match = match;
	  this.query = query;

	  this.unmatchedPath = this.match && this.match._ ?
	    this.match._[0] :
	    null;

	  this.matchedPath = this.unmatchedPath ?
	    this.path.substring(0, this.path.length - this.unmatchedPath.length) :
	    this.path;
	}

	var EMPTY_OBJECT = {}; // Maintains reference equality, useful for SCU
	Object.freeze && Object.freeze(EMPTY_OBJECT);
	Match.prototype.getProps = function() {
	  if (!this.route) {
	    throw new Error("React-router-component: No route matched! Did you define a NotFound route?");
	  }
	  var props = assign({}, this.route.props, this.match);
	  // Querystring is assigned as _query.
	  props._query = this.query || EMPTY_OBJECT;

	  // Delete props that shouldn't be passed to the handler.
	  delete props.pattern;
	  delete props.path;
	  delete props.handler;

	  return props;
	}

	Match.prototype.getHandler = function() {
	  if (!this.route) return undefined;

	  return this.route.props.handler;
	};

	module.exports = matchRoutes;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.10.0
	var slice = [].slice;

	(function(root, factory) {
	  if (('function' === "function") && (__webpack_require__(28) != null)) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined" && exports !== null) {
	    return module.exports = factory();
	  } else {
	    return root.UrlPattern = factory();
	  }
	})(this, function() {
	  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
	  escapeForRegex = function(string) {
	    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	  };
	  concatMap = function(array, f) {
	    var i, length, results;
	    results = [];
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      results = results.concat(f(array[i]));
	    }
	    return results;
	  };
	  stringConcatMap = function(array, f) {
	    var i, length, result;
	    result = '';
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      result += f(array[i]);
	    }
	    return result;
	  };
	  regexGroupCount = function(regex) {
	    return (new RegExp(regex.toString() + '|')).exec('').length - 1;
	  };
	  keysAndValuesToObject = function(keys, values) {
	    var i, key, length, object, value;
	    object = {};
	    i = -1;
	    length = keys.length;
	    while (++i < length) {
	      key = keys[i];
	      value = values[i];
	      if (value == null) {
	        continue;
	      }
	      if (object[key] != null) {
	        if (!Array.isArray(object[key])) {
	          object[key] = [object[key]];
	        }
	        object[key].push(value);
	      } else {
	        object[key] = value;
	      }
	    }
	    return object;
	  };
	  P = {};
	  P.Result = function(value, rest) {
	    this.value = value;
	    this.rest = rest;
	  };
	  P.Tagged = function(tag, value) {
	    this.tag = tag;
	    this.value = value;
	  };
	  P.tag = function(tag, parser) {
	    return function(input) {
	      var result, tagged;
	      result = parser(input);
	      if (result == null) {
	        return;
	      }
	      tagged = new P.Tagged(tag, result.value);
	      return new P.Result(tagged, result.rest);
	    };
	  };
	  P.regex = function(regex) {
	    return function(input) {
	      var matches, result;
	      matches = regex.exec(input);
	      if (matches == null) {
	        return;
	      }
	      result = matches[0];
	      return new P.Result(result, input.slice(result.length));
	    };
	  };
	  P.sequence = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, rest, result, values;
	      i = -1;
	      length = parsers.length;
	      values = [];
	      rest = input;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(rest);
	        if (result == null) {
	          return;
	        }
	        values.push(result.value);
	        rest = result.rest;
	      }
	      return new P.Result(values, rest);
	    };
	  };
	  P.pick = function() {
	    var indexes, parsers;
	    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return function(input) {
	      var array, result;
	      result = P.sequence.apply(P, parsers)(input);
	      if (result == null) {
	        return;
	      }
	      array = result.value;
	      result.value = array[indexes];
	      return result;
	    };
	  };
	  P.string = function(string) {
	    var length;
	    length = string.length;
	    return function(input) {
	      if (input.slice(0, length) === string) {
	        return new P.Result(string, input.slice(length));
	      }
	    };
	  };
	  P.lazy = function(fn) {
	    var cached;
	    cached = null;
	    return function(input) {
	      if (cached == null) {
	        cached = fn();
	      }
	      return cached(input);
	    };
	  };
	  P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
	    var endResult, parserResult, rest, results;
	    rest = input;
	    results = stringResult ? '' : [];
	    while (true) {
	      if (end != null) {
	        endResult = end(rest);
	        if (endResult != null) {
	          break;
	        }
	      }
	      parserResult = parser(rest);
	      if (parserResult == null) {
	        break;
	      }
	      if (stringResult) {
	        results += parserResult.value;
	      } else {
	        results.push(parserResult.value);
	      }
	      rest = parserResult.rest;
	    }
	    if (atLeastOneResultRequired && results.length === 0) {
	      return;
	    }
	    return new P.Result(results, rest);
	  };
	  P.many1 = function(parser) {
	    return function(input) {
	      return P.baseMany(parser, null, false, true, input);
	    };
	  };
	  P.concatMany1Till = function(parser, end) {
	    return function(input) {
	      return P.baseMany(parser, end, true, true, input);
	    };
	  };
	  P.firstChoice = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, result;
	      i = -1;
	      length = parsers.length;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(input);
	        if (result != null) {
	          return result;
	        }
	      }
	    };
	  };
	  newParser = function(options) {
	    var U;
	    U = {};
	    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
	    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
	      return U.pattern;
	    }), P.string(options.optionalSegmentEndChar)));
	    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
	    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
	      return U.name;
	    })));
	    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
	    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function() {
	      return U.escapedChar;
	    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
	    U.token = P.lazy(function() {
	      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
	    });
	    U.pattern = P.many1(P.lazy(function() {
	      return U.token;
	    }));
	    return U;
	  };
	  defaultOptions = {
	    escapeChar: '\\',
	    segmentNameStartChar: ':',
	    segmentValueCharset: 'a-zA-Z0-9-_~ %',
	    segmentNameCharset: 'a-zA-Z0-9',
	    optionalSegmentStartChar: '(',
	    optionalSegmentEndChar: ')',
	    wildcardChar: '*'
	  };
	  baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return baseAstNodeToRegexString(node, segmentValueCharset);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return '(.*?)';
	      case 'named':
	        return "([" + segmentValueCharset + "]+)";
	      case 'static':
	        return escapeForRegex(astNode.value);
	      case 'optional':
	        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
	    }
	  };
	  astNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (segmentValueCharset == null) {
	      segmentValueCharset = defaultOptions.segmentValueCharset;
	    }
	    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
	  };
	  astNodeToNames = function(astNode) {
	    if (Array.isArray(astNode)) {
	      return concatMap(astNode, astNodeToNames);
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return ['_'];
	      case 'named':
	        return [astNode.value];
	      case 'static':
	        return [];
	      case 'optional':
	        return astNodeToNames(astNode.value);
	    }
	  };
	  getParam = function(params, key, nextIndexes, sideEffects) {
	    var index, maxIndex, result, value;
	    if (sideEffects == null) {
	      sideEffects = false;
	    }
	    value = params[key];
	    if (value == null) {
	      if (sideEffects) {
	        throw new Error("no values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    index = nextIndexes[key] || 0;
	    maxIndex = Array.isArray(value) ? value.length - 1 : 0;
	    if (index > maxIndex) {
	      if (sideEffects) {
	        throw new Error("too few values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    result = Array.isArray(value) ? value[index] : value;
	    if (sideEffects) {
	      nextIndexes[key] = index + 1;
	    }
	    return result;
	  };
	  astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
	    var i, length;
	    if (Array.isArray(astNode)) {
	      i = -1;
	      length = astNode.length;
	      while (++i < length) {
	        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, false) != null;
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, false) != null;
	      case 'static':
	        return false;
	      case 'optional':
	        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
	    }
	  };
	  stringify = function(astNode, params, nextIndexes) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return stringify(node, params, nextIndexes);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, true);
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, true);
	      case 'static':
	        return astNode.value;
	      case 'optional':
	        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
	          return stringify(astNode.value, params, nextIndexes);
	        } else {
	          return '';
	        }
	    }
	  };
	  UrlPattern = function(arg1, arg2) {
	    var groupCount, options, parsed, parser, withoutWhitespace;
	    if (arg1 instanceof UrlPattern) {
	      this.isRegex = arg1.isRegex;
	      this.regex = arg1.regex;
	      this.ast = arg1.ast;
	      this.names = arg1.names;
	      return;
	    }
	    this.isRegex = arg1 instanceof RegExp;
	    if (!(('string' === typeof arg1) || this.isRegex)) {
	      throw new TypeError('argument must be a regex or a string');
	    }
	    if (this.isRegex) {
	      this.regex = arg1;
	      if (arg2 != null) {
	        if (!Array.isArray(arg2)) {
	          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
	        }
	        groupCount = regexGroupCount(this.regex);
	        if (arg2.length !== groupCount) {
	          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
	        }
	        this.names = arg2;
	      }
	      return;
	    }
	    if (arg1 === '') {
	      throw new Error('argument must not be the empty string');
	    }
	    withoutWhitespace = arg1.replace(/\s+/g, '');
	    if (withoutWhitespace !== arg1) {
	      throw new Error('argument must not contain whitespace');
	    }
	    options = {
	      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
	      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
	      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
	      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
	      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
	      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
	      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
	    };
	    parser = newParser(options);
	    parsed = parser.pattern(arg1);
	    if (parsed == null) {
	      throw new Error("couldn't parse pattern");
	    }
	    if (parsed.rest !== '') {
	      throw new Error("could only partially parse pattern");
	    }
	    this.ast = parsed.value;
	    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
	    this.names = astNodeToNames(this.ast);
	  };
	  UrlPattern.prototype.match = function(url) {
	    var groups, match;
	    match = this.regex.exec(url);
	    if (match == null) {
	      return null;
	    }
	    groups = match.slice(1);
	    if (this.names) {
	      return keysAndValuesToObject(this.names, groups);
	    } else {
	      return groups;
	    }
	  };
	  UrlPattern.prototype.stringify = function(params) {
	    if (params == null) {
	      params = {};
	    }
	    if (this.isRegex) {
	      throw new Error("can't stringify patterns generated from a regex");
	    }
	    if (params !== Object(params)) {
	      throw new Error("argument must be an object or undefined");
	    }
	    return stringify(this.ast, params, {});
	  };
	  UrlPattern.escapeForRegex = escapeForRegex;
	  UrlPattern.concatMap = concatMap;
	  UrlPattern.stringConcatMap = stringConcatMap;
	  UrlPattern.regexGroupCount = regexGroupCount;
	  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
	  UrlPattern.P = P;
	  UrlPattern.newParser = newParser;
	  UrlPattern.defaultOptions = defaultOptions;
	  UrlPattern.astNodeToRegexString = astNodeToRegexString;
	  UrlPattern.astNodeToNames = astNodeToNames;
	  UrlPattern.getParam = getParam;
	  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
	  UrlPattern.stringify = stringify;
	  return UrlPattern;
	});


/***/ },
/* 28 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule warning
	 */

	"use strict";

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function(){};

	if ("production" !== process.env.NODE_ENV) {
	  warning = function(condition, format ) {var args=Array.prototype.slice.call(arguments,2);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      /*eslint no-console:0*/
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Stringify = __webpack_require__(31);
	var Parse = __webpack_require__(33);


	// Declare internals

	var internals = {};


	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(32);


	// Declare internals

	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function (prefix, key) {

	            return prefix + '[]';
	        },
	        indices: function (prefix, key) {

	            return prefix + '[' + key + ']';
	        },
	        repeat: function (prefix, key) {

	            return prefix;
	        }
	    },
	    strictNullHandling: false,
	    skipNulls: false,
	    encode: true
	};


	internals.stringify = function (obj, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort) {

	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    }
	    else if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        if (strictNullHandling) {
	            return encode ? Utils.encode(prefix) : prefix;
	        }

	        obj = '';
	    }

	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {

	        if (encode) {
	            return [Utils.encode(prefix) + '=' + Utils.encode(obj)];
	        }
	        return [prefix + '=' + obj];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];

	        if (skipNulls &&
	            obj[key] === null) {

	            continue;
	        }

	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encode, filter));
	        }
	        else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, skipNulls, encode, filter));
	        }
	    }

	    return values;
	};


	module.exports = function (obj, options) {

	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : internals.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : internals.encode;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var objKeys;
	    var filter;
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    }
	    else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    }
	    else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    }
	    else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (sort) {
	        objKeys.sort(sort);
	    }

	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];

	        if (skipNulls &&
	            obj[key] === null) {

	            continue;
	        }

	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort));
	    }

	    return keys.join(delimiter);
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	// Load modules


	// Declare internals

	var internals = {};
	internals.hexTable = new Array(256);
	for (var h = 0; h < 256; ++h) {
	    internals.hexTable[h] = '%' + ((h < 16 ? '0' : '') + h.toString(16)).toUpperCase();
	}


	exports.arrayToObject = function (source, options) {

	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {

	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};


	exports.merge = function (target, source, options) {

	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        }
	        else if (typeof target === 'object') {
	            target[source] = true;
	        }
	        else {
	            target = [target, source];
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }

	    if (Array.isArray(target) &&
	        !Array.isArray(source)) {

	        target = exports.arrayToObject(target, options);
	    }

	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];

	        if (!Object.prototype.hasOwnProperty.call(target, key)) {
	            target[key] = value;
	        }
	        else {
	            target[key] = exports.merge(target[key], value, options);
	        }
	    }

	    return target;
	};


	exports.decode = function (str) {

	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	exports.encode = function (str) {

	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    if (typeof str !== 'string') {
	        str = '' + str;
	    }

	    var out = '';
	    for (var i = 0, il = str.length; i < il; ++i) {
	        var c = str.charCodeAt(i);

	        if (c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A)) { // A-Z

	            out += str[i];
	            continue;
	        }

	        if (c < 0x80) {
	            out += internals.hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }

	        ++i;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
	        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	exports.compact = function (obj, refs) {

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return obj;
	    }

	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = Object.keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }

	    return obj;
	};


	exports.isRegExp = function (obj) {

	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};


	exports.isBuffer = function (obj) {

	    if (obj === null ||
	        typeof obj === 'undefined') {

	        return false;
	    }

	    return !!(obj.constructor &&
	              obj.constructor.isBuffer &&
	              obj.constructor.isBuffer(obj));
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(32);


	// Declare internals

	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false,
	    allowDots: false
	};


	internals.parseValues = function (str, options) {

	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';

	            if (options.strictNullHandling) {
	                obj[Utils.decode(part)] = null;
	            }
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));

	            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }

	    return obj;
	};


	internals.parseObject = function (chain, val, options) {

	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            indexString === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays &&
	             index <= options.arrayLimit)) {

	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};


	internals.parseKeys = function (key, val, options) {

	    if (!key) {
	        return;
	    }

	    // Transform dot notation to bracket notation

	    if (options.allowDots) {
	        key = key.replace(/\.([^\.\[]+)/g, '[$1]');
	    }

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1])) {

	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {

	        ++i;
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {

	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return internals.parseObject(keys, val, options);
	};


	module.exports = function (str, options) {

	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : internals.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : internals.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : internals.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;

	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {

	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }

	    return Utils.compact(obj);
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Routing environment.
	 *
	 * It specifies how routers read its state from DOM and synchronise it back.
	 */

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	var DummyEnvironment      = __webpack_require__(35);
	var Environment           = __webpack_require__(36);

	/**
	 * Mixin for routes to keep attached to an environment.
	 *
	 * This mixin assumes the environment is passed via props.
	 */
	var Mixin = {

	  componentDidMount: function() {
	    this.getEnvironment().register(this);
	  },

	  componentWillUnmount: function() {
	    this.getEnvironment().unregister(this);
	  }
	};

	var PathnameEnvironment;
	var HashEnvironment;

	var pathnameEnvironment;
	var hashEnvironment;
	var defaultEnvironment;
	var dummyEnvironment;

	if (canUseDOM) {

	  PathnameEnvironment = __webpack_require__(51);
	  HashEnvironment     = __webpack_require__(52);

	  pathnameEnvironment = new PathnameEnvironment();
	  hashEnvironment     = new HashEnvironment();
	  defaultEnvironment  = (window.history !== undefined &&
	                         window.history.pushState !== undefined) ?
	                        pathnameEnvironment :
	                        hashEnvironment;

	} else {

	  dummyEnvironment    = new DummyEnvironment();
	  pathnameEnvironment = dummyEnvironment;
	  hashEnvironment     = dummyEnvironment;
	  defaultEnvironment  = dummyEnvironment;

	}

	module.exports = {
	  pathnameEnvironment: pathnameEnvironment,
	  hashEnvironment: hashEnvironment,
	  defaultEnvironment: defaultEnvironment,
	  dummyEnvironment: dummyEnvironment,

	  Environment: Environment,
	  PathnameEnvironment: PathnameEnvironment,
	  HashEnvironment: HashEnvironment,

	  Mixin: Mixin
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Environment   = __webpack_require__(36);
	var emptyFunction = function() {};

	/**
	 * Dummy routing environment which provides no path.
	 *
	 * Should be used on server or in WebWorker.
	 */
	function DummyEnvironment() {
	  Environment.call(this);
	}

	DummyEnvironment.prototype = Object.create(Environment.prototype);
	DummyEnvironment.prototype.constructor = DummyEnvironment;

	DummyEnvironment.prototype.getPath = function() { return null; };

	DummyEnvironment.prototype.setPath = function(path, navigation, cb) {
	  // Support old (path, cb) arity
	  if (typeof navigation === 'function' && cb === undefined) {
	    cb = navigation;
	    navigation = {};
	  }
	  this.path = path;
	  cb();
	};

	DummyEnvironment.prototype.start = emptyFunction;

	DummyEnvironment.prototype.stop = emptyFunction;

	module.exports = DummyEnvironment;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// batchedUpdates is now exposed in 0.12
	var batchedUpdates = __webpack_require__(37).unstable_batchedUpdates || __webpack_require__(1).batchedUpdates;

	/**
	 * Base abstract class for a routing environment.
	 *
	 * @private
	 */
	function Environment() {
	  this.routers = [];
	  this.path = this.getPath();
	}

	/**
	 * Notify routers about the change.
	 *
	 * @param {Object} navigation
	 * @param {Function} cb
	 */
	Environment.prototype.notify = function notify(navigation, cb) {
	  var latch = this.routers.length;

	  if (latch === 0) {
	    return cb && cb();
	  }

	  function callback() {
	    latch -= 1;
	    if (cb && latch === 0) {
	      cb();
	    }
	  }

	  batchedUpdates(function() {
	    for (var i = 0, len = this.routers.length; i < len; i++) {
	      this.routers[i].setPath(this.path, navigation, callback);
	    }
	  }.bind(this));
	};

	Environment.prototype.makeHref = function makeHref(path) {
	  return path;
	};

	Environment.prototype.navigate = function navigate(path, navigation, cb) {
	  return this.setPath(path, navigation, cb);
	};

	Environment.prototype.setPath = function(path, navigation, cb) {
	  // Support (path, cb) arity.
	  if (typeof navigation === 'function' && cb === undefined) {
	    cb = navigation;
	    navigation = {};
	  }
	  // Support (path) arity.
	  if (!navigation) navigation = {};

	  if (!navigation.isPopState) {
	    if (navigation.replace) {
	      this.replaceState(path, navigation);
	    } else {
	      this.pushState(path, navigation);
	    }
	  }
	  this.path = path;
	  this.notify(navigation, cb);
	};

	/**
	 * Register router with an environment.
	 */
	Environment.prototype.register = function register(router) {
	  if (this.routers.length === 0) {
	    this.start();
	  }

	  if (router.getParentRouter === undefined || !router.getParentRouter()) {
	    this.routers.push(router);
	  }
	};

	/**
	 * Unregister router from an environment.
	 */
	Environment.prototype.unregister = function unregister(router) {
	  if (this.routers.indexOf(router) > -1) {
	    this.routers.splice(this.routers.indexOf(router), 1);
	  }

	  if (this.routers.length === 0) {
	    this.stop();
	  }
	};

	module.exports = Environment;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(38);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOM
	 * @typechecks static-only
	 */

	"use strict";

	var ReactElement = __webpack_require__(39);
	var ReactElementValidator = __webpack_require__(44);
	var ReactLegacyElement = __webpack_require__(49);

	var mapObject = __webpack_require__(50);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if ("production" !== process.env.NODE_ENV) {
	    return ReactLegacyElement.markNonLegacyFactory(
	      ReactElementValidator.createFactory(tag)
	    );
	  }
	  return ReactLegacyElement.markNonLegacyFactory(
	    ReactElement.createFactory(tag)
	  );
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOM = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',

	  // SVG
	  circle: 'circle',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'

	}, createDOMFactory);

	module.exports = ReactDOM;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	"use strict";

	var ReactContext = __webpack_require__(40);
	var ReactCurrentOwner = __webpack_require__(41);

	var warning = __webpack_require__(42);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true
	};

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} object
	 * @param {string} key
	 */
	function defineWarningProperty(object, key) {
	  Object.defineProperty(object, key, {

	    configurable: false,
	    enumerable: true,

	    get: function() {
	      if (!this._store) {
	        return null;
	      }
	      return this._store[key];
	    },

	    set: function(value) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        false,
	        'Don\'t set the ' + key + ' property of the component. ' +
	        'Mutate the existing props object instead.'
	      ) : null);
	      this._store[key] = value;
	    }

	  });
	}

	/**
	 * This is updated to true if the membrane is successfully created.
	 */
	var useMutationMembrane = false;

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} element
	 */
	function defineMutationMembrane(prototype) {
	  try {
	    var pseudoFrozenProperties = {
	      props: true
	    };
	    for (var key in pseudoFrozenProperties) {
	      defineWarningProperty(prototype, key);
	    }
	    useMutationMembrane = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	/**
	 * Base constructor for all React elements. This is only used to make this
	 * work with a dynamic instanceof check. Nothing should live on this prototype.
	 *
	 * @param {*} type
	 * @param {string|object} ref
	 * @param {*} key
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function(type, key, ref, owner, context, props) {
	  // Built-in properties that belong on the element
	  this.type = type;
	  this.key = key;
	  this.ref = ref;

	  // Record the component responsible for creating this element.
	  this._owner = owner;

	  // TODO: Deprecate withContext, and then the context becomes accessible
	  // through the owner.
	  this._context = context;

	  if ("production" !== process.env.NODE_ENV) {
	    // The validation flag and props are currently mutative. We put them on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    this._store = { validated: false, props: props };

	    // We're not allowed to set props directly on the object so we early
	    // return and rely on the prototype membrane to forward to the backing
	    // store.
	    if (useMutationMembrane) {
	      Object.freeze(this);
	      return;
	    }
	  }

	  this.props = props;
	};

	// We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {
	  _isReactElement: true
	};

	if ("production" !== process.env.NODE_ENV) {
	  defineMutationMembrane(ReactElement.prototype);
	}

	ReactElement.createElement = function(type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;

	  if (config != null) {
	    ref = config.ref === undefined ? null : config.ref;
	    if ("production" !== process.env.NODE_ENV) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        config.key !== null,
	        'createElement(...): Encountered component with a `key` of null. In ' +
	        'a future version, this will be treated as equivalent to the string ' +
	        '\'null\'; instead, provide an explicit key or use undefined.'
	      ) : null);
	    }
	    // TODO: Change this back to `config.key === undefined`
	    key = config.key == null ? null : '' + config.key;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) &&
	          !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (typeof props[propName] === 'undefined') {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  return new ReactElement(
	    type,
	    key,
	    ref,
	    ReactCurrentOwner.current,
	    ReactContext.current,
	    props
	  );
	};

	ReactElement.createFactory = function(type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. <Foo />.type === Foo.type.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
	  var newElement = new ReactElement(
	    oldElement.type,
	    oldElement.key,
	    oldElement.ref,
	    oldElement._owner,
	    oldElement._context,
	    newProps
	  );

	  if ("production" !== process.env.NODE_ENV) {
	    // If the key on the original is valid, then the clone is valid
	    newElement._store.validated = oldElement._store.validated;
	  }
	  return newElement;
	};

	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function(object) {
	  // ReactTestUtils is often used outside of beforeEach where as React is
	  // within it. This leads to two different instances of React on the same
	  // page. To identify a element from a different React instance we use
	  // a flag instead of an instanceof check.
	  var isElement = !!(object && object._isReactElement);
	  // if (isElement && !(object instanceof ReactElement)) {
	  // This is an indicator that you're using multiple versions of React at the
	  // same time. This will screw with ownership and stuff. Fix it, please.
	  // TODO: We could possibly warn here.
	  // }
	  return isElement;
	};

	module.exports = ReactElement;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactContext
	 */

	"use strict";

	var assign = __webpack_require__(12);

	/**
	 * Keeps track of the current context.
	 *
	 * The context is automatically passed down the component ownership hierarchy
	 * and is accessible via `this.context` on ReactCompositeComponents.
	 */
	var ReactContext = {

	  /**
	   * @internal
	   * @type {object}
	   */
	  current: {},

	  /**
	   * Temporarily extends the current context while executing scopedCallback.
	   *
	   * A typical use case might look like
	   *
	   *  render: function() {
	   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
	   *
	   *    ));
	   *    return <div>{children}</div>;
	   *  }
	   *
	   * @param {object} newContext New context to merge into the existing context
	   * @param {function} scopedCallback Callback to run with the new context
	   * @return {ReactComponent|array<ReactComponent>}
	   */
	  withContext: function(newContext, scopedCallback) {
	    var result;
	    var previousContext = ReactContext.current;
	    ReactContext.current = assign({}, previousContext, newContext);
	    try {
	      result = scopedCallback();
	    } finally {
	      ReactContext.current = previousContext;
	    }
	    return result;
	  }

	};

	module.exports = ReactContext;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	"use strict";

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(43);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if ("production" !== process.env.NODE_ENV) {
	  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };

	module.exports = emptyFunction;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	"use strict";

	var ReactElement = __webpack_require__(39);
	var ReactPropTypeLocations = __webpack_require__(45);
	var ReactCurrentOwner = __webpack_require__(41);

	var monitorCodeUse = __webpack_require__(48);
	var warning = __webpack_require__(42);

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {
	  'react_key_warning': {},
	  'react_numeric_key_warning': {}
	};
	var ownerHasMonitoredObjectMap = {};

	var loggedTypeFailures = {};

	var NUMERIC_PROPERTY_REGEX = /^\d+$/;

	/**
	 * Gets the current owner's displayName for use in warnings.
	 *
	 * @internal
	 * @return {?string} Display name or undefined
	 */
	function getCurrentOwnerDisplayName() {
	  var current = ReactCurrentOwner.current;
	  return current && current.constructor.displayName || undefined;
	}

	/**
	 * Warn if the component doesn't have an explicit key assigned to it.
	 * This component is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactComponent} component Component that requires a key.
	 * @param {*} parentType component's parent's type.
	 */
	function validateExplicitKey(component, parentType) {
	  if (component._store.validated || component.key != null) {
	    return;
	  }
	  component._store.validated = true;

	  warnAndMonitorForKeyUse(
	    'react_key_warning',
	    'Each child in an array should have a unique "key" prop.',
	    component,
	    parentType
	  );
	}

	/**
	 * Warn if the key is being defined as an object property but has an incorrect
	 * value.
	 *
	 * @internal
	 * @param {string} name Property name of the key.
	 * @param {ReactComponent} component Component that requires a key.
	 * @param {*} parentType component's parent's type.
	 */
	function validatePropertyKey(name, component, parentType) {
	  if (!NUMERIC_PROPERTY_REGEX.test(name)) {
	    return;
	  }
	  warnAndMonitorForKeyUse(
	    'react_numeric_key_warning',
	    'Child objects should have non-numeric keys so ordering is preserved.',
	    component,
	    parentType
	  );
	}

	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} warningID The id used when logging.
	 * @param {string} message The base warning that gets output.
	 * @param {ReactComponent} component Component that requires a key.
	 * @param {*} parentType component's parent's type.
	 */
	function warnAndMonitorForKeyUse(warningID, message, component, parentType) {
	  var ownerName = getCurrentOwnerDisplayName();
	  var parentName = parentType.displayName;

	  var useName = ownerName || parentName;
	  var memoizer = ownerHasKeyUseWarning[warningID];
	  if (memoizer.hasOwnProperty(useName)) {
	    return;
	  }
	  memoizer[useName] = true;

	  message += ownerName ?
	    (" Check the render method of " + ownerName + ".") :
	    (" Check the renderComponent call using <" + parentName + ">.");

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwnerName = null;
	  if (component._owner && component._owner !== ReactCurrentOwner.current) {
	    // Name of the component that originally created this child.
	    childOwnerName = component._owner.constructor.displayName;

	    message += (" It was passed a child from " + childOwnerName + ".");
	  }

	  message += ' See http://fb.me/react-warning-keys for more information.';
	  monitorCodeUse(warningID, {
	    component: useName,
	    componentOwner: childOwnerName
	  });
	  console.warn(message);
	}

	/**
	 * Log that we're using an object map. We're considering deprecating this
	 * feature and replace it with proper Map and ImmutableMap data structures.
	 *
	 * @internal
	 */
	function monitorUseOfObjectMap() {
	  var currentName = getCurrentOwnerDisplayName() || '';
	  if (ownerHasMonitoredObjectMap.hasOwnProperty(currentName)) {
	    return;
	  }
	  ownerHasMonitoredObjectMap[currentName] = true;
	  monitorCodeUse('react_object_map_children');
	}

	/**
	 * Ensure that every component either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {*} component Statically passed child of any type.
	 * @param {*} parentType component's parent's type.
	 * @return {boolean}
	 */
	function validateChildKeys(component, parentType) {
	  if (Array.isArray(component)) {
	    for (var i = 0; i < component.length; i++) {
	      var child = component[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(component)) {
	    // This component was passed in a valid location.
	    component._store.validated = true;
	  } else if (component && typeof component === 'object') {
	    monitorUseOfObjectMap();
	    for (var name in component) {
	      validatePropertyKey(name, component[name], parentType);
	    }
	  }
	}

	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	        // This will soon use the warning module
	        monitorCodeUse(
	          'react_failed_descriptor_type_check',
	          { message: error.message }
	        );
	      }
	    }
	  }
	}

	var ReactElementValidator = {

	  createElement: function(type, props, children) {
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    ("production" !== process.env.NODE_ENV ? warning(
	      type != null,
	      'React.createElement: type should not be null or undefined. It should ' +
	        'be a string (for DOM elements) or a ReactClass (for composite ' +
	        'components).'
	    ) : null);

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], type);
	    }

	    if (type) {
	      var name = type.displayName;
	      if (type.propTypes) {
	        checkPropTypes(
	          name,
	          type.propTypes,
	          element.props,
	          ReactPropTypeLocations.prop
	        );
	      }
	      if (type.contextTypes) {
	        checkPropTypes(
	          name,
	          type.contextTypes,
	          element._context,
	          ReactPropTypeLocations.context
	        );
	      }
	    }
	    return element;
	  },

	  createFactory: function(type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(
	      null,
	      type
	    );
	    validatedFactory.type = type;
	    return validatedFactory;
	  }

	};

	module.exports = ReactElementValidator;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	"use strict";

	var keyMirror = __webpack_require__(46);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = __webpack_require__(47);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  ("production" !== process.env.NODE_ENV ? invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ("production" !== process.env.NODE_ENV) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule monitorCodeUse
	 */

	"use strict";

	var invariant = __webpack_require__(47);

	/**
	 * Provides open-source compatible instrumentation for monitoring certain API
	 * uses before we're ready to issue a warning or refactor. It accepts an event
	 * name which may only contain the characters [a-z0-9_] and an optional data
	 * object with further information.
	 */

	function monitorCodeUse(eventName, data) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    eventName && !/[^a-z0-9_]/.test(eventName),
	    'You must provide an eventName using only the characters [a-z0-9_]'
	  ) : invariant(eventName && !/[^a-z0-9_]/.test(eventName)));
	}

	module.exports = monitorCodeUse;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactLegacyElement
	 */

	"use strict";

	var ReactCurrentOwner = __webpack_require__(41);

	var invariant = __webpack_require__(47);
	var monitorCodeUse = __webpack_require__(48);
	var warning = __webpack_require__(42);

	var legacyFactoryLogs = {};
	function warnForLegacyFactoryCall() {
	  if (!ReactLegacyElementFactory._isLegacyCallWarningEnabled) {
	    return;
	  }
	  var owner = ReactCurrentOwner.current;
	  var name = owner && owner.constructor ? owner.constructor.displayName : '';
	  if (!name) {
	    name = 'Something';
	  }
	  if (legacyFactoryLogs.hasOwnProperty(name)) {
	    return;
	  }
	  legacyFactoryLogs[name] = true;
	  ("production" !== process.env.NODE_ENV ? warning(
	    false,
	    name + ' is calling a React component directly. ' +
	    'Use a factory or JSX instead. See: http://fb.me/react-legacyfactory'
	  ) : null);
	  monitorCodeUse('react_legacy_factory_call', { version: 3, name: name });
	}

	function warnForPlainFunctionType(type) {
	  var isReactClass =
	    type.prototype &&
	    typeof type.prototype.mountComponent === 'function' &&
	    typeof type.prototype.receiveComponent === 'function';
	  if (isReactClass) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'Did not expect to get a React class here. Use `Component` instead ' +
	      'of `Component.type` or `this.constructor`.'
	    ) : null);
	  } else {
	    if (!type._reactWarnedForThisType) {
	      try {
	        type._reactWarnedForThisType = true;
	      } catch (x) {
	        // just incase this is a frozen object or some special object
	      }
	      monitorCodeUse(
	        'react_non_component_in_jsx',
	        { version: 3, name: type.name }
	      );
	    }
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'This JSX uses a plain function. Only React components are ' +
	      'valid in React\'s JSX transform.'
	    ) : null);
	  }
	}

	function warnForNonLegacyFactory(type) {
	  ("production" !== process.env.NODE_ENV ? warning(
	    false,
	    'Do not pass React.DOM.' + type.type + ' to JSX or createFactory. ' +
	    'Use the string "' + type.type + '" instead.'
	  ) : null);
	}

	/**
	 * Transfer static properties from the source to the target. Functions are
	 * rebound to have this reflect the original source.
	 */
	function proxyStaticMethods(target, source) {
	  if (typeof source !== 'function') {
	    return;
	  }
	  for (var key in source) {
	    if (source.hasOwnProperty(key)) {
	      var value = source[key];
	      if (typeof value === 'function') {
	        var bound = value.bind(source);
	        // Copy any properties defined on the function, such as `isRequired` on
	        // a PropTypes validator.
	        for (var k in value) {
	          if (value.hasOwnProperty(k)) {
	            bound[k] = value[k];
	          }
	        }
	        target[key] = bound;
	      } else {
	        target[key] = value;
	      }
	    }
	  }
	}

	// We use an object instead of a boolean because booleans are ignored by our
	// mocking libraries when these factories gets mocked.
	var LEGACY_MARKER = {};
	var NON_LEGACY_MARKER = {};

	var ReactLegacyElementFactory = {};

	ReactLegacyElementFactory.wrapCreateFactory = function(createFactory) {
	  var legacyCreateFactory = function(type) {
	    if (typeof type !== 'function') {
	      // Non-function types cannot be legacy factories
	      return createFactory(type);
	    }

	    if (type.isReactNonLegacyFactory) {
	      // This is probably a factory created by ReactDOM we unwrap it to get to
	      // the underlying string type. It shouldn't have been passed here so we
	      // warn.
	      if ("production" !== process.env.NODE_ENV) {
	        warnForNonLegacyFactory(type);
	      }
	      return createFactory(type.type);
	    }

	    if (type.isReactLegacyFactory) {
	      // This is probably a legacy factory created by ReactCompositeComponent.
	      // We unwrap it to get to the underlying class.
	      return createFactory(type.type);
	    }

	    if ("production" !== process.env.NODE_ENV) {
	      warnForPlainFunctionType(type);
	    }

	    // Unless it's a legacy factory, then this is probably a plain function,
	    // that is expecting to be invoked by JSX. We can just return it as is.
	    return type;
	  };
	  return legacyCreateFactory;
	};

	ReactLegacyElementFactory.wrapCreateElement = function(createElement) {
	  var legacyCreateElement = function(type, props, children) {
	    if (typeof type !== 'function') {
	      // Non-function types cannot be legacy factories
	      return createElement.apply(this, arguments);
	    }

	    var args;

	    if (type.isReactNonLegacyFactory) {
	      // This is probably a factory created by ReactDOM we unwrap it to get to
	      // the underlying string type. It shouldn't have been passed here so we
	      // warn.
	      if ("production" !== process.env.NODE_ENV) {
	        warnForNonLegacyFactory(type);
	      }
	      args = Array.prototype.slice.call(arguments, 0);
	      args[0] = type.type;
	      return createElement.apply(this, args);
	    }

	    if (type.isReactLegacyFactory) {
	      // This is probably a legacy factory created by ReactCompositeComponent.
	      // We unwrap it to get to the underlying class.
	      if (type._isMockFunction) {
	        // If this is a mock function, people will expect it to be called. We
	        // will actually call the original mock factory function instead. This
	        // future proofs unit testing that assume that these are classes.
	        type.type._mockedReactClassConstructor = type;
	      }
	      args = Array.prototype.slice.call(arguments, 0);
	      args[0] = type.type;
	      return createElement.apply(this, args);
	    }

	    if ("production" !== process.env.NODE_ENV) {
	      warnForPlainFunctionType(type);
	    }

	    // This is being called with a plain function we should invoke it
	    // immediately as if this was used with legacy JSX.
	    return type.apply(null, Array.prototype.slice.call(arguments, 1));
	  };
	  return legacyCreateElement;
	};

	ReactLegacyElementFactory.wrapFactory = function(factory) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    typeof factory === 'function',
	    'This is suppose to accept a element factory'
	  ) : invariant(typeof factory === 'function'));
	  var legacyElementFactory = function(config, children) {
	    // This factory should not be called when JSX is used. Use JSX instead.
	    if ("production" !== process.env.NODE_ENV) {
	      warnForLegacyFactoryCall();
	    }
	    return factory.apply(this, arguments);
	  };
	  proxyStaticMethods(legacyElementFactory, factory.type);
	  legacyElementFactory.isReactLegacyFactory = LEGACY_MARKER;
	  legacyElementFactory.type = factory.type;
	  return legacyElementFactory;
	};

	// This is used to mark a factory that will remain. E.g. we're allowed to call
	// it as a function. However, you're not suppose to pass it to createElement
	// or createFactory, so it will warn you if you do.
	ReactLegacyElementFactory.markNonLegacyFactory = function(factory) {
	  factory.isReactNonLegacyFactory = NON_LEGACY_MARKER;
	  return factory;
	};

	// Checks if a factory function is actually a legacy factory pretending to
	// be a class.
	ReactLegacyElementFactory.isValidFactory = function(factory) {
	  // TODO: This will be removed and moved into a class validator or something.
	  return typeof factory === 'function' &&
	    factory.isReactLegacyFactory === LEGACY_MARKER;
	};

	ReactLegacyElementFactory.isValidClass = function(factory) {
	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'isValidClass is deprecated and will be removed in a future release. ' +
	      'Use a more specific validator instead.'
	    ) : null);
	  }
	  return ReactLegacyElementFactory.isValidFactory(factory);
	};

	ReactLegacyElementFactory._isLegacyCallWarningEnabled = true;

	module.exports = ReactLegacyElementFactory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule mapObject
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Environment = __webpack_require__(36);

	/**
	 * Routing environment which routes by `location.pathname`.
	 */
	function PathnameEnvironment() {
	  this.onPopState = this.onPopState.bind(this);
	  this.useHistoryApi = !!(window.history &&
	                          window.history.pushState &&
	                          window.history.replaceState);
	  Environment.call(this);
	}

	PathnameEnvironment.prototype = Object.create(Environment.prototype);
	PathnameEnvironment.prototype.constructor = PathnameEnvironment;

	PathnameEnvironment.prototype.getPath = function() {
	  return window.location.pathname + window.location.search;
	};

	PathnameEnvironment.prototype.pushState = function(path, navigation) {
	  if (this.useHistoryApi) {
	    window.history.pushState({}, '', path);
	  } else {
	    window.location.pathname = path;
	  }
	};

	PathnameEnvironment.prototype.replaceState = function(path, navigation) {
	  if (this.useHistoryApi) {
	    window.history.replaceState({}, '', path);
	  } else {
	    window.location.pathname = path;
	  }
	};

	PathnameEnvironment.prototype.start = function() {
	  if (this.useHistoryApi && window.addEventListener) {
	    window.addEventListener('popstate', this.onPopState);
	  }
	};

	PathnameEnvironment.prototype.stop = function() {
	  if (this.useHistoryApi && window.removeEventListener) {
	    window.removeEventListener('popstate', this.onPopState);
	  }
	};

	PathnameEnvironment.prototype.onPopState = function(e) {
	  var path = window.location.pathname;

	  if (this.path !== path) {
	    this.setPath(path, {isPopState: true});
	  }
	};

	module.exports = PathnameEnvironment;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Environment = __webpack_require__(36);

	/**
	 * Routing environment which routes by `location.hash`.
	 */
	function HashEnvironment() {
	  this.onHashChange = this.onHashChange.bind(this);
	  Environment.call(this);
	}

	HashEnvironment.prototype = Object.create(Environment.prototype);
	HashEnvironment.prototype.constructor = HashEnvironment;

	HashEnvironment.prototype.getPath = function() {
	  return window.location.hash.slice(1) || '/';
	};

	HashEnvironment.prototype.pushState = function(path, navigation) {
	  window.location.hash = path;
	};

	HashEnvironment.prototype.replaceState = function(path, navigation) {
	  var href = window.location.href.replace(/(javascript:|#).*$/, '');
	  window.location.replace(href + '#' + path);
	};

	HashEnvironment.prototype.start = function() {
	  if (window.addEventListener) {
	    window.addEventListener('hashchange', this.onHashChange);
	  } else {
	    window.attachEvent('onhashchange', this.onHashChange);
	  }
	};

	HashEnvironment.prototype.stop = function() {
	  if (window.removeEventListener) {
	    window.removeEventListener('hashchange', this.onHashChange);
	  } else {
	    window.detachEvent('onhashchange', this.onHashChange);
	  }
	};

	HashEnvironment.prototype.onHashChange = function() {
	  var path = this.getPath();

	  if (this.path !== path) {
	    this.setPath(path, {isPopState: true});
	  }
	};

	module.exports = HashEnvironment;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var assign = Object.assign || __webpack_require__(25);


	/**
	 * Mixin for routers which implements the simplest rendering strategy.
	 */
	var RouteRenderingMixin = {

	  // Props passed at the `childProps` key are passed to all handlers.
	  getChildProps: function() {
	    var childProps = this.props.childProps || {};
	    // Merge up from parents, with inner props taking priority.
	    var parent = this.getParentRouter();
	    if (parent) {
	      childProps = assign({}, parent.getChildProps(), childProps);
	    }
	    return childProps;
	  },

	  renderRouteHandler: function(props) {
	    if (!this.state.match.route) {
	      throw new Error("React-router-component: No route matched! Did you define a NotFound route?");
	    }
	    var handler = this.state.handler;
	    var matchProps = this.state.matchProps;

	    props = assign({ref: this.state.match.route.ref}, this.getChildProps(), props, matchProps);
	    // If we were passed an element, we need to clone it before passing it along.
	    if (React.isValidElement(handler)) {
	      // Be sure to keep the props that were already set on the handler.
	      // Otherwise, a handler like <div className="foo">bar</div> would have its className lost.
	      return React.cloneElement(handler, assign(props, handler.props));
	    }
	    return React.createElement(handler, props);
	  }

	};

	module.exports = RouteRenderingMixin;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	function createClass(name) {
	  return React.createClass({
	    displayName: name,
	    propTypes: {
	      handler: React.PropTypes.oneOfType([
	        // Can be ReactElement or ReactComponent, unfortunately there is no way to typecheck
	        // ReactComponent (that I know of)
	        React.PropTypes.element,
	        React.PropTypes.func
	      ]),
	      path: name === 'NotFound' ?
	        function(props, propName) {
	          if (props[propName]) throw new Error("Don't pass a `path` to NotFound.");
	        }
	        : React.PropTypes.oneOfType([
	            React.PropTypes.string,
	            React.PropTypes.instanceOf(RegExp)
	          ]).isRequired,
	      urlPatternOptions: React.PropTypes.oneOfType([
	        React.PropTypes.arrayOf(React.PropTypes.string),
	        React.PropTypes.object
	      ])
	    },
	    getDefaultProps: function() {
	      if (name === 'NotFound') {
	        return {path: null};
	      }
	      return {};
	    },
	    render: function() {
	      throw new Error(name + " is not meant to be directly rendered.");
	    }
	  });
	}

	module.exports = {
	  /**
	   * Regular route descriptor.
	   *
	   * @param {Object} spec
	   */
	  Route: createClass('Route'),
	  /**
	   * Catch all route descriptor.
	   *
	   * @param {Object} spec
	   */
	  NotFound: createClass('NotFound')
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React             = __webpack_require__(1);
	var NavigatableMixin  = __webpack_require__(56);
	var Environment       = __webpack_require__(34);
	var assign            = Object.assign || __webpack_require__(25);

	/**
	 * Link.
	 *
	 * A basic navigatable component which renders into <a> DOM element and handles
	 * onClick event by transitioning onto different route (defined by
	 * this.props.href).
	 */
	var Link = React.createClass({
	  mixins: [NavigatableMixin],

	  displayName: 'Link',

	  propTypes: {
	    href: React.PropTypes.string.isRequired,
	    global: React.PropTypes.bool,
	    globalHash: React.PropTypes.bool
	  },

	  onClick: function(e) {
	    if (this.props.onClick) {
	      this.props.onClick(e);
	    }

	    // return if the link target is external
	    if (this.props.href.match(/^([a-z-]+:|\/\/)/)) return;

	    // return if the user did a middle-click, right-click, or used a modifier
	    // key (like ctrl-click, meta-click, shift-click, etc.)
	    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

	    if (!e.defaultPrevented) {
	      e.preventDefault();
	      this._navigate(this.props.href, function(err) {
	        if (err) {
	          throw err;
	        }
	      });
	    }
	  },

	  _navigationParams: function() {
	    var params = {};
	    for (var k in this.props) {
	      if (!this.constructor.propTypes[k]) {
	        params[k] = this.props[k];
	      }
	    }
	    return params;
	  },

	  _createHref: function() {
	    return this.props.global ?
	      Environment.defaultEnvironment.makeHref(this.props.href) :
	      this.makeHref(this.props.href);
	  },

	  _navigate: function(path, cb) {
	    if (this.props.globalHash) {
	      return Environment.hashEnvironment.navigate(path, cb);
	    }

	    if (this.props.global) {
	      return Environment.defaultEnvironment.navigate(path, cb);
	    }

	    return this.navigate(path, this._navigationParams(), cb);
	  },

	  render: function() {
	    var props = assign({}, this.props, {
	      onClick: this.onClick,
	      href: this._createHref()
	    });
	    return React.DOM.a(props, this.props.children);
	  }
	});

	module.exports = Link;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React       = __webpack_require__(1);
	var Environment = __webpack_require__(34);


	/**
	 * NavigatableMixin
	 *
	 * A mixin for a component which operates in context of a router and can
	 * navigate to a different route using `navigate(path, navigation, cb)` method.
	 */
	var NavigatableMixin = {

	  contextTypes: {
	    router: React.PropTypes.any
	  },

	  /**
	   * @private
	   */
	  _getNavigable: function() {
	    return this.context.router || Environment.defaultEnvironment;
	  },

	  getPath: function() {
	    return this._getNavigable().getPath();
	  },

	  navigate: function(path, navigation, cb) {
	    return this._getNavigable().navigate(path, navigation, cb);
	  },

	  makeHref: function(path) {
	    return this._getNavigable().makeHref(path);
	  }
	};

	module.exports = NavigatableMixin;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React       = __webpack_require__(1);
	var urllite     = __webpack_require__(58);
	var Environment = __webpack_require__(34);
	var HashEnvironment = __webpack_require__(52);
	var assign      = Object.assign || __webpack_require__(25);

	/**
	 * A container component which captures <a> clicks and, if there's a matching
	 * route defined, routes them.
	 */
	var CaptureClicks = React.createClass({
	  displayName: 'CaptureClicks',

	  propTypes: {
	    component: React.PropTypes.func.isRequired,
	    environment: React.PropTypes.object
	  },

	  getDefaultProps: function() {
	    return {
	      component: React.DOM.div,
	      environment: Environment.defaultEnvironment,
	      gotoURL: function(url) {
	        // We should really just be allowing the event's default action, be we
	        // can't make the decision to do that synchronously.
	        window.location.href = url;
	      }
	    };
	  },

	  onClick: function(e) {
	    if (this.props.onClick) {
	      var shouldProceed = this.props.onClick(e);
	      if (shouldProceed === false) return;
	    }

	    // Ignore canceled events, modified clicks, and right clicks.
	    if (e.defaultPrevented) {
	      return;
	    }

	    if (e.metaKey || e.ctrlKey || e.shiftKey) {
	      return;
	    }

	    if (e.button !== 0) {
	      return;
	    }

	    // Get the <a> element.
	    var el = e.target;
	    while (el && el.nodeName !== 'A') {
	      el = el.parentNode;
	    }

	    // Ignore clicks from non-a elements.
	    if (!el) {
	      return;
	    }

	    // Ignore the click if the element has a target.
	    if (el.target && el.target !== '_self') {
	      return;
	    }

	    // Ignore the click if it's a download link. (We use this method of
	    // detecting the presence of the attribute for old IE versions.)
	    if (el.attributes.download) {
	      return;
	    }

	    // Ignore hash (used often instead of javascript:void(0) in strict CSP envs)
	    if (el.getAttribute('href') === '#' && !(this.props.environment instanceof HashEnvironment)) {
	      return;
	    }

	    // Use a regular expression to parse URLs instead of relying on the browser
	    // to do it for us (because IE).
	    var url = urllite(el.href);
	    var windowURL = urllite(window.location.href);

	    // Ignore links that don't share a protocol and host with ours.
	    if (url.protocol !== windowURL.protocol || url.host !== windowURL.host) {
	      return;
	    }

	    // Ignore 'rel="external"' links.
	    if (el.rel && /(?:^|\s+)external(?:\s+|$)/.test(el.rel)) {
	      return;
	    }

	    // Prevent :focus from sticking; preventDefault() stops blur in some browsers
	    el.blur();
	    e.preventDefault();

	    // flag if we already found a "not found" case and bailed
	    var bail = false;

	    var onBeforeNavigation = function(path, navigation) {
	      if (bail) {
	        return false;
	      } else if (!navigation.match || !navigation.match.match) {
	        bail = true;
	        this.props.gotoURL(el.href);
	        return false;
	      }
	    }.bind(this);

	    this.props.environment.navigate(
	      url.pathname + (url.hash.length > 1 ? url.hash : ''),
	      {onBeforeNavigation: onBeforeNavigation},
	      function(err, info) {
	        if (err) {
	          throw err;
	        }
	      });
	  },

	  render: function() {
	    var props = assign({}, this.props, {
	      onClick: this.onClick
	    });
	    return this.props.component(props, this.props.children);
	  }

	});

	module.exports = CaptureClicks;


/***/ },
/* 58 */
/***/ function(module, exports) {

	(function() {
	  var URL, URL_PATTERN, defaults, urllite,
	    __hasProp = {}.hasOwnProperty;

	  URL_PATTERN = /^(?:(?:([^:\/?\#]+:)\/+|(\/\/))(?:([a-z0-9-\._~%]+)(?::([a-z0-9-\._~%]+))?@)?(([a-z0-9-\._~%!$&'()*+,;=]+)(?::([0-9]+))?)?)?([^?\#]*?)(\?[^\#]*)?(\#.*)?$/;

	  urllite = function(raw, opts) {
	    return urllite.URL.parse(raw, opts);
	  };

	  urllite.URL = URL = (function() {
	    function URL(props) {
	      var k, v, _ref;
	      for (k in defaults) {
	        if (!__hasProp.call(defaults, k)) continue;
	        v = defaults[k];
	        this[k] = (_ref = props[k]) != null ? _ref : v;
	      }
	      this.host || (this.host = this.hostname && this.port ? "" + this.hostname + ":" + this.port : this.hostname ? this.hostname : '');
	      this.origin || (this.origin = this.protocol ? "" + this.protocol + "//" + this.host : '');
	      this.isAbsolutePathRelative = !this.host && this.pathname.charAt(0) === '/';
	      this.isPathRelative = !this.host && this.pathname.charAt(0) !== '/';
	      this.isRelative = this.isSchemeRelative || this.isAbsolutePathRelative || this.isPathRelative;
	      this.isAbsolute = !this.isRelative;
	    }

	    URL.parse = function(raw) {
	      var m, pathname, protocol;
	      m = raw.toString().match(URL_PATTERN);
	      pathname = m[8] || '';
	      protocol = m[1];
	      return new urllite.URL({
	        protocol: protocol,
	        username: m[3],
	        password: m[4],
	        hostname: m[6],
	        port: m[7],
	        pathname: protocol && pathname.charAt(0) !== '/' ? "/" + pathname : pathname,
	        search: m[9],
	        hash: m[10],
	        isSchemeRelative: m[2] != null
	      });
	    };

	    return URL;

	  })();

	  defaults = {
	    protocol: '',
	    username: '',
	    password: '',
	    host: '',
	    hostname: '',
	    port: '',
	    pathname: '',
	    search: '',
	    hash: '',
	    origin: '',
	    isSchemeRelative: false
	  };

	  module.exports = urllite;

	}).call(this);


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React=__webpack_require__(1);
	var CatalogDetail=React.createClass({displayName: "CatalogDetail",

	render:function()
	{
		
		return null
	}

	});
	module.exports=CatalogDetail; 

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React=__webpack_require__(1);

	var Header=__webpack_require__(61)

	var Template=React.createClass({displayName: "Template",


	render:function()
	{
		
		return (
	React.createElement("div", {className: "container"}, 
	React.createElement(Header, null), 
	this.props.children
	)
			)
	}

	});
	module.exports=Template;  

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React=__webpack_require__(1);

	var CartSummary=__webpack_require__(62)

	var Header=React.createClass({displayName: "Header",


	render:function()
	{
		
		return (
	          React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-6"}, React.createElement("h1", null, "Lets Shop")), 
	React.createElement("div", {className: "col-sm-6 col-sm-push-3"}, 
	           React.createElement("br", null), 
	           React.createElement(CartSummary, null)
	          )
	          )

			)
	}
	 
	});
	module.exports=Header;  

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	var React=__webpack_require__(1);


	var Link=__webpack_require__(21).Link;

	var CartSummary=React.createClass({displayName: "CartSummary",


	render:function()
	{
		
		return (
	          React.createElement("div", null, 
	          React.createElement(Link, {href: "/cart", className: "btn btn-success"}, 
	          "Cart Items:QTY / $COST"
	          )
	          )

			)
	}

	});
	module.exports=CartSummary; 

/***/ }
/******/ ]);