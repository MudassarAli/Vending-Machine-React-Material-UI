import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Product} from "./Product"

export class ProductList extends React.Component{
  render (){
      var items = this.props.items.map((item, index) => {
        return (
          <Product key={index} item={item} index={index} selectedItemIndex={this.props.selectedItemIndex} buyProduct= {this.props.buyProduct}  selectedProduct= {this.props.selectedProduct} />
        );
      });   

    return (
      <Grid container className="root" spacing={16}>
        <Grid item xs={12}>
          <Grid container className="demo" justify="center">
             {items} 
          </Grid>
        </Grid>
      </Grid>     
    );
  }
}