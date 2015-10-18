var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

module.exports = TodoActions;
var React = require('react');
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({displayName: "Footer",

  render: function() {
    var allTodos = this.props.data;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        React.createElement("button", {
          id: "clear-completed", 
          onClick: this._onClearCompletedClick}, 
          "Clear completed (", completed, ")"
        );
    }

    return (
      React.createElement("footer", {id: "footer"}, 
        React.createElement("span", {id: "todo-count"}, 
          React.createElement("strong", null, 
            itemsLeft
          ), 
          itemsLeftPhrase
        ), 
        clearCompletedButton
      )
    );
  },

  _onClearCompletedClick: function() {
    TodoActions.destroyCompleted();
  }
});

module.exports = Footer;

var React = require('react');
var TodoTextInput = require('./TodoTextInput');
var TodoActions = require('../actions/TodoActions');

var Header = React.createClass({displayName: "Header",

  render: function() {
    return (
      React.createElement("header", {id: "header"}, 
        React.createElement("h1", null, "todos"), 
        React.createElement(TodoTextInput, {
          id: "new-todo", 
          placeholder: "What needs to be done?", 
          onSave: this._onSave}
        )
      )
    );
  },

  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(text);
    }
  }

});

module.exports = Header;

var React = require('react');
var TodoItem = require('./TodoItem');

var MainSection = React.createClass({displayName: "MainSection",

  render: function() {
    if (Object.keys(this.props.data).length < 1) {
      return null;
    }

    var allTodos = this.props.data;
    var todos = [];
    for (var key in allTodos) {
      todos.push(React.createElement(TodoItem, {key: key, todo: allTodos[key]}));
    }
    return (
      React.createElement("section", {id: "main"}, 
        React.createElement("input", {
          id: "toggle-all", 
          type: "checkbox"}
        ), 
        React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
        React.createElement("ul", {id: "todo-list"}, todos)
      )
    );
  },
});

module.exports = MainSection;

var React = require('react');

var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');

var TodoStore = require('../stores/TodoStore');

var TodoApp = React.createClass({displayName: "TodoApp",

  getInitialState: function() {
    return TodoStore.getAll();
  },

  componentDidMount: function() {
    TodoStore.on('change', this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeListener('change', this._onChange);
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Header, null), 
        React.createElement(MainSection, {data: this.state}), 
        React.createElement(Footer, {data: this.state})
      )
    );
  },

  _onChange: function() {
    this.state = TodoStore.getAll();
    this.forceUpdate();
    // this.setState(TodoStore.getAll());
  }

});

module.exports = TodoApp;

var React = require('react');
var classNames = require('classnames');
var TodoTextInput = require('./TodoTextInput');
var TodoActions = require('../actions/TodoActions');
var TodoItem = React.createClass({displayName: "TodoItem",

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  render: function() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        React.createElement(TodoTextInput, {
          className: "edit", 
          onSave: this._onSave, 
          value: todo.text}
        );
    }

    return (
      React.createElement("li", {
        className: classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        }), 
        key: todo.id}, 
        React.createElement("div", {className: "view"}, 
          React.createElement("input", {
            className: "toggle", 
            type: "checkbox", 
            checked: todo.complete, 
            onChange: this._onToggleComplete}
          ), 
          React.createElement("label", {onDoubleClick: this._onDoubleClick}, 
            todo.text
          ), 
          React.createElement("button", {className: "destroy", onClick: this._onDestroyClick})
        ), 
        input
      )
    );
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo);
  },

  _onSave: function(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoActions.destroy(this.props.todo.id);
  }

});

module.exports = TodoItem;

  var React = require('react');

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({displayName: "TodoTextInput",

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() /*object*/ {
    return (
      React.createElement("input", {
        className: this.props.className, 
        id: this.props.id, 
        placeholder: this.props.placeholder, 
        onBlur: this._save, 
        onChange: this._onChange, 
        onKeyDown: this._onKeyDown, 
        value: this.state.value, 
        autoFocus: true}
      )
    );
  },

  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = TodoTextInput;

var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var TodoStore = require('../stores/TodoStore');

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case 'TODO_CREATE':
      text = action.text.trim();
      if (text !== '') {
        TodoStore.create(text);
        TodoStore.emit('change');
      }
      break;

    case 'TODO_UPDATE_TEXT':
      text = action.text.trim();
      if (text !== '') {
        TodoStore.update(action.id, {text: text});
        TodoStore.emit('change');
      }
      break;

    case 'TODO_DESTROY_COMPLETED':
      TodoStore.destroyCompleted();
      TodoStore.emit('change');
      break;

    case 'TODO_DESTROY':
      TodoStore.destroy(action.id);
      TodoStore.emit('change');
      break;

    case 'TODO_COMPLETE':
      TodoStore.update(action.id, {complete: true});
      TodoStore.emit('change');
      break;

    case 'TODO_UNDO_COMPLETE':
      TodoStore.update(action.id, {complete: false});
      TodoStore.emit('change');
      break;

    default:
      // no op
  }
});

module.exports = AppDispatcher;

var keyMirror = require('keymirror');

module.exports = keyMirror({
  TODO_CREATE: null,
  TODO_COMPLETE: null,
  TODO_DESTROY: null,
  TODO_DESTROY_COMPLETED: null,
  TODO_TOGGLE_COMPLETE_ALL: null,
  TODO_UNDO_COMPLETE: null,
  TODO_UPDATE_TEXT: null
});
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _todos = {};

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _todos;
  },

  create: function(text){
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
      id: id,
      complete: false,
      text: text
    };
  },

  destroy: function (id) {
    delete _todos[id];
  },

  destroyCompleted: function() {
    for (var id in _todos) {
      if (_todos[id].complete) {
        this.destroy(id);
      }
    }
  },

  update: function (id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
  }
});

module.exports = TodoStore;
