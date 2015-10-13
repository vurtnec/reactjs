/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the CartStore and passes the new data to its children.
 */


var React = require('react');
var Cartridges = require('./Cartridges.react');

var Page = React.createClass({
	
  getInitialState: function() {	
    return this.props.pageContentItem;
  },
  
  componentDidMount: function() {
	var this1 = this;
	if(window)
	{
		window.resetPageState = function(url){
		  $.ajax(
			{ url: url, 
			  success: function(rootContentItem){	
				this1.setState(rootContentItem);
			  },
			  error: function(e){
				  console.log('error:'+ e);
			  }
			});
		};
	}
  },
  
  /**
   * @return {object}
   */
  render: function() {
	return (
      <div id="wrap" class="clear-block" >
		<div id="topSection"> 
			<Cartridges cartridges={this.state.topSection} />
		</div>
		<div id="mainSection"> 
			<Cartridges cartridges={this.state.mainSection} />
		</div>
		<div id="bottomSection"> 
			<Cartridges cartridges={this.state.bottomSection} />
		</div>
	</div>
    );
  }
});

module.exports = Page;
