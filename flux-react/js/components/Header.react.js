/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var LogoBox = React.createClass({

  render: function() {
	return (
		<div className="LogoBox">
			<a href="/" className="logo"></a>
		</div>
	);
  }
});

var RegisterOrLogin = React.createClass({

  render: function() {
	
	return (
		<div>
			<a href="/loginForm">Login</a> 
			<span className ="cutline"> | </span> 
			<a href="/registerForm">Register</a>
		</div>
	);	
  }
});

var UserInfo = React.createClass({

  render: function() {
	 var user = this.props.user;
	 if(user.hasLogin == true)
	 {
		return (
			<div>
				Welcome, &lt; <span className="orange"><a href="/updateInfoForm">{user.firstName}, {user.lastName}
					</a></span> &gt; <span className="cutline">|</span>
				<a href="/logout" >Logout</a>
			</div>
		);
	}   
  }
});

var CartInfo = React.createClass({

  render: function() {
	return (
		<div> 
			<a href="shoppingCart.jsp">Shopping Cart</a> 
			(<span className="orange blod"> 0  </span> items)
		</div>
	); 
  }
});

var Header = React.createClass({

  render: function() {
	var user = this.props.cartridge.user;
	//alert('user: ' + user.hasLogin);
	var accountArea = null;
	if(user.hasLogin != true)
	{
		accountArea = <RegisterOrLogin /> ;
	}
	else
	{
		accountArea = <UserInfo user={user} /> ;
	}		
	return (
		<div id="header">
			<LogoBox />
			<div className="loginBox">
			  {accountArea}
			  
			  <CartInfo />
			</div>
		</div>
	);
  }
});

module.exports = Header;
