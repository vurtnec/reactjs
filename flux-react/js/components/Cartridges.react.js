var React = require('react');
var Cartridge = require('./Cartridge.react');

var Cartridges = React.createClass({

	
  /**
   * @return {object}
   */
  render: function() {
	  
	var cartridgesContent = [];
	var cartridges = this.props.cartridges;
	for(var i in cartridges)  
	{
		cartridgesContent.push(<Cartridge cartridge={cartridges[i]} />);
	}
	  
	return (<div > {cartridgesContent} </div>);
  }
});

module.exports = Cartridges;
