var ReactDispatcher = require('flux-react-dispatcher');
var dispatcher = new ReactDispatcher()

var Count = React.createClass({
    getInitialState: function() {
        return {
            items: []
        };
    },

    componentWillMount: function() {
        emitter.on("store-changed", function(items) {
            this.setState({ items: items });
        }.bind(this));
    },
    
    componentDidMount: function() {
        dispatcher.dispatch({ type: "get-all-items" });
    },

    render: function() {
        var items = this.state.items;
        return <div>{items.length}</div>;
    }
});

var Store = function() {
    dispatcher.register(function(payload) {
        switch (payload.type) {
            case "get-all-items":
                this._all();
                break;
        }
    }.bind(this));
    
    this._all = function() {
        $.get("https://api.github.com/users/mralexgray/repos", function(items) {
            this._notify(items);
        }.bind(this));
    }
    
    this._notify = function(items) {
        emitter.emit("store-changed", items);
    }
};

var ItemStore = new Store();

"use strict";

var Todo = React.createClass({
    getInitialState: function() {
        return {
            todos: []
        }  
    },

    componentWillMount: function() {
        emitter.on(constants.changed, function(todos) {
            this.setState({ todos: todos });
        }.bind(this));
    },
    
    componentDidMount: function() {
        dispatcher.dispatch({ type: constants.all });
    },
    
    componentsWillUnmount: function() {
        emitter.off(constants.all);
    },
    
    create: function() {
        this.refs.create.show();
    },
    
    renderList: function(complete) {
        return <List todos={_.filter(this.state.todos, function(x) { return x.isComplete === complete; })} />;
    },
    
    render: function() {
        return <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h1>Todo List</h1>
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-primary pull-right spacing-top" onClick={this.create}>New Task</button>    
                </div>
            </div>
                    
            <div className="row">
                <div className="col-md-6">
                    <h2 className="spacing-bottom">Incomplete</h2>
                    {this.renderList(false)}
                </div>
                <div className="col-md-6">
                    <h2 className="spacing-bottom">Complete</h2>
                    {this.renderList(true)}
                </div>
            </div>
            
            <Modal ref="create" />
        </div>;
    }
});
