var React = require('react');
var CartActions = require('../actions/CartActions');
var CartStore = require('../stores/CartStore');

var CartHeader = React.createClass({
 
  render: function() {
	
    return (
      <div className="listBox">
		<ul className="head">
			<li className="item">Item</li>
			<li className="qty">Quantity</li>
			<li className="price">Total Price</li>
		</ul>
	  </div>
    );
  }
});

var CartItems = React.createClass({
 
  render: function() {
	 
	var commerceItems = this.props.cart.commerceItems;
    var items = [];
	
    for (var i in commerceItems) {
      items.push(<CartItem item={commerceItems[i]} />);
    }
	
    return (
		<div id="cartApp" className="listBox">
			<ul>
			  {items}
			</ul>
		</div>
    );
  }
});

var CartItem = React.createClass({
 
  render: function() {
	var item = this.props.item;
    return (
		<div>
			<li className="item">
				<p className="name">
					<a href="">{item.skuName}</a>
				</p>
				<p>
					SKU: <span>{item.skuId}</span>
				</p>
			</li>
			<li className="qty">
				<input type="text" id=""
				className="textInput" 
				defaultValue={item.quantity}
				onChange={this._onChange} />
			</li>
			<li className="price">{item.priceInfo.amount}</li>
			<div className="btnBox">
				<a onClick={this._onDeleteClick} className="btn"><span>Delete</span></a>
			</div>
		</div>
    );
  },
  

  _onDeleteClick: function() {	
  
	$.ajax(
	{ url: "/cart/remove2?commerceItemId=" + this.props.item.id, 
	  success: function(json){
		  window.resetPageState('/cart/json');
	 }
	});
  },
   
   _onChange: function(event) {	
     $.ajax(
	 { url: "/cart/update2?commerceItemId=" + this.props.item.id +"&quantity=" + event.target.value, 
	  success: function(json){
		  window.resetPageState('/cart/json');
		}
	 });
  }

});

var ShoppingCart = React.createClass({
	
   /** 
   * @return {object}
   */
  render: function() {
	var cart = this.props.cartridge.cart; 
	  
	if(cart == null)
	{
		return(<div/>);
	}
	
    return (
		<div>
			<h3>shopping cart</h3>

			<div className="shoppingCart">
				<span data-style="color:green"></span>
				
				<CartHeader />
				
				<CartItems cart={cart}/>

				<div className="subTotal">Sub Total: {cart.priceInfo.total} </div>

				<div className="btnBox">
					<a href="/checkout/shippingForm" className="btn"><span>checkout</span></a>
				</div>
			</div>
		</div>
    );
  }
});

module.exports = ShoppingCart;
