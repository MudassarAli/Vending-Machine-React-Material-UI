import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';

export class ShoppingCart extends React.Component {
    constructor(props){
      super(props)
      
      this.state = {
          productsInShoppingcart:[]

      }      

      this._hideShoppingCart = this._hideShoppingCart.bind(this);
      this._removeProduct = this._removeProduct.bind(this);
    }
   
    _hideShoppingCart(e){
      e.preventDefault(); 
      this.props.hideShoppingCart();  
      this._removeProduct = this._removeProduct.bind(this);
    }

    _removeProduct(item, index, e){
        e.preventDefault(); 
        this.props.removeproduct(item, index);      
    }

    render() { 
        let TotalAmount = 0; 
        let GrandTotal = 0;
        var items= this.props.soldproducts.map((item, index) => {
          TotalAmount = +TotalAmount + +item.price; 
          GrandTotal = (+GrandTotal + +TotalAmount) * 0.035 

          return (<div className="product">
              <div className="product-image">
                  <img src={item.imageurl} />
              </div>
              <div className="product-details">
                  <div className="product-title">{item.name}</div>
                  <p className="product-description">{item.description}</p>
              </div>
              <div className="product-price">{item.price}</div>
              <div className="product-quantity">
                  <input type="number" value="1" min="1" />
              </div>
              <div className="product-removal">
                  <a href="#" className="btn btn-danger" onClick={() => this._removeProduct(item, index, event)}>Remove</a>                  
              </div>
              <div className="product-line-price">{item.price}</div>
          </div>     
          );
        });
        
       
        return (   
          <div className="shopping-cart">
            <div>
                <a href="#" className="btn btn-primary" onClick={this._hideShoppingCart}>GO BACK</a>
            </div>

            <h1>Shopping Cart</h1>

            <div className="column-labels">
              <label className="product-image">Image</label>
              <label className="product-details">Product</label>
              <label className="product-price">Price</label>
              <label className="product-quantity">Quantity</label>
              <label className="product-removal">Remove</label>
              <label className="product-line-price">Total</label>
            </div>

            {items}

            <div className="totals">
              <div className="totals-item">
                <label>Subtotal</label>
                <div className="totals-value" id="cart-subtotal">{TotalAmount}</div>
              </div>
              <div className="totals-item">
                <label>Tax (3.5%)</label>
                <div className="totals-value" id="cart-tax">3</div>
              </div>
              <div className="totals-item">
                <label>Shipping</label>
                <div className="totals-value" id="cart-shipping">15.00</div>
              </div>
              <div className="totals-item totals-item-total">
                <label>Grand Total</label>
                <div className="totals-value" id="cart-total">{+GrandTotal + 15}</div>
              </div>
            </div>
                
                <button className="checkout">Checkout</button>
          </div>
        )
    };
}