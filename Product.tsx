import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';
import IProduct from "./IProduct"


export class Product extends React.Component<IProduct> {
  constructor(props:IProduct) {
    super(props);

    this._buyProduct = this._buyProduct.bind(this);
    this._selectedProduct = this._selectedProduct.bind(this);
  }

  _buyProduct() {
    var index = parseInt(this.props.index);
    this.props.buyProduct(index);    
  }

  _selectedProduct(e) {
    e.preventDefault();
    this.props.selectedProduct(this.props.item, this.props.index);
  }

  render() {
    return (
      <div className="card">
        <img width="300px" height="350px" src={this.props.item.imageurl} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{this.props.item.name}</h5>
          <p className="card-text"><span> Description</span> {this.props.item.description}</p>
          <p className="card-text"><span> Price</span> ${this.props.item.price}</p>
          <p className="card-text"><span> Total</span> {this.props.item.total}</p>

          <a href="#" className="btn btn-primary" onClick={this._selectedProduct} >ViewDetails</a>

          {this.props.item.total === 0 ?
            <a href="#" className="btn btn-danger disabled">Sold out</a> :
            <a href="#" className="btn btn-success" onClick={this._buyProduct} >Buy  </a>
          }
        </div>
      </div>
    );
  }
}