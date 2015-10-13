var React = require('react');

getTag = function(tagName)
{
	return require('./components/'+ tagName +'.react');
}
//var TagObj = require('./Header.react');
var cartridgeViewMapping = {
	Header: require('./Header.react'),
	Footer: require('./Footer.react'),
	ShoppingCart: require('./ShoppingCart.react')
	};

var Cartridge = React.createClass({
	
  /**
   * @return {object}
   */
  render: function() {
	var currentCartridge = this.props.cartridge;
	
	if(currentCartridge && currentCartridge['@type'])
	{
		var TagObj = cartridgeViewMapping[currentCartridge['@type']];
		
		//alert('viewName: ' + currentCartridge.viewName + ', TagObj:' + TagObj);
		if(TagObj)
		{
			return (
				<TagObj cartridge={currentCartridge} />
			)
		}
		else
		{
			return (
				<div id={currentCartridge.viewName}  />
			)
		}
    }
  }
});

module.exports = Cartridge;
