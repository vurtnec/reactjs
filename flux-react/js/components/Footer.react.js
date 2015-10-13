/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var CartActions = require('../actions/CartActions');

var Footer = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
	  
	var links = this.props.cartridge.links; 
	var linksContent = [];
	for(var i in links)
	{
		linksContent.push(<a herf={links[i].url} > {links[i].name} </a>);
	}
   	return (
		<div> {linksContent} </div>
    );
  }

});

module.exports = Footer;
