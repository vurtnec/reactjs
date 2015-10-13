/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * CartActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CartConstants = require('../constants/CartConstants');

var CartActions = {

  /**
   * @param  {string} text
   */
  updateItem: function(id, quantity) {
    AppDispatcher.dispatch({
      actionType: CartConstants.CART_UPDATE,
      id: id,
	  quantity: quantity
    });
  },

  /**
   * @param  {string} id The ID of the Cart item
   * @param  {string} text
   */
  deleteItem: function(id) {
    AppDispatcher.dispatch({
      actionType: CartConstants.CART_DELETE,
      id: id
    });
  }
};

module.exports = CartActions;
