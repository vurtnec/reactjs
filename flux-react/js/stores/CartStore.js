/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * CartStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var CartStore = assign({}, EventEmitter.prototype, {

  cartInfo: function(callback){
	$.ajax(
	{ url: "/cart/json", 
	  success: function(cart){	
		callback(cart);
		}
	});
  },
  
  updateItem: function(id, quantity){
	$.ajax(
	{ url: "/cart/update2?commerceItemId=" + id +"&quantity=" + quantity, 
	  success: function(data){
		  CartStore.emitChange();
		}
	});
  },

  deleteItem: function(id){	
	$.ajax(
	{ url: "/cart/remove2?commerceItemId=" + id, 
	  success: function(data){
		  CartStore.emitChange();
	 }
	});
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = CartStore;
