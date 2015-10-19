var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _todos = {};

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    $.ajax({
      url: "http://127.0.0.1:3000/queryAll",
      async: false,
      success: function(data){
        for(var i=0; i<data.length; i++) {
          _todos[data[i]] = {
            id: data[i].id,
            complete: data[i].completed == 0 ? false : true,
            text: data[i].text
          }
        }
      }
    });
    return _todos;
  },

  getTodos: function() {
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
