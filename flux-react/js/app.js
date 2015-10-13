/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var pageContentItem = {
	topSection: [{viewName:'Header', user:{hasLogin:true, firstName:'Kevin', lastName:'Qu'}}],
	mainSection: [{viewName:'ShoppingCart'}],
	bottomSection: [{viewName:'Footer', footer:{links:[{name:'site map',url:'/siteMap'},{name:'about us',url:'/aboutUs'}]}}]	
};

var Page = require('./components/Page.react');

React.render(
  <Page pageContentItem={rootContentItem}/>,
  document.getElementById('pageBody')
);
