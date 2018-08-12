import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';

export class ProductDetails extends React.Component{
  constructor(props) {
    super(props)  

    this._buyProduct = this._buyProduct.bind(this);   
    this._hideShoppingCart = this._hideShoppingCart.bind(this);     
  }

  _buyProduct() {
    var index = parseInt(this.props.index);
    this.props.buyProduct(index);
  }  

  _hideShoppingCart(e){
     e.preventDefault(); 
    this.props.hideShoppingCart();  
  }

  render (){
    return (
      <div className="card">
      <div>
       <a href="#" className="btn btn-primary" onClick={this._hideShoppingCart}>GO BACK</a>
       </div>
        <img width = "300px" height = "350px" src={this.props.selectedProduct.imageurl} alt="Card image cap" />
        <div className="card-body">
            <h5 className="card-title">{this.props.selectedProduct.name}</h5>
            <p className="card-text"><span> Description</span> {this.props.selectedProduct.description}</p>
            <p className="card-text"><span> Price</span> ${this.props.selectedProduct.price}</p>             
            <p className="card-text"><span> Total</span> {this.props.selectedProduct.total}</p>       

            {this.props.selectedProduct.total === 0 ?             
                <a href="#" className="btn btn-danger disabled">Sold out</a> :        
                <a href="#" className="btn btn-success" onClick={this._buyProduct}>Buy  </a>
            }            
        </div>
      </div>    
    );
  }
}