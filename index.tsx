import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IProduct from "./IProduct"
import {ProductList} from "./ProductList";
import {Search} from "./Search";
import {Product} from "./Product"
import {ProductDetails} from "./ProductDetails"
import {ShoppingCart} from "./ShoppingCart"
import SweetAlert from 'sweetalert-react';


export class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
       initialProducts: [
          {name:"Cococola",description :"Best product ever.", price:"2.00", total: 5, imageurl :"https://image.ibb.co/fcPC5e/download.jpg"}, 
          {name:"Fanta", description :"Best product ever.", price:"3.00", total: 5, imageurl :"https://image.ibb.co/n1FoBK/fanta.jpg"},
          {name:"Sprite", description :"Best product ever.", price:"4.00", total: 5, imageurl :"https://image.ibb.co/hDG6yz/Sprite.jpg"},
          {name:"Dew", description :"Best product ever.", price:"5.00", total: 5, imageurl :"https://image.ibb.co/iaBvrK/Mountain_Dew.jpg"},
          {name:"Redbull", description :"Best product ever.", price:"6.00", total: 0, imageurl :"https://preview.ibb.co/kFDEke/Redbull.jpg"}
       ],
       products: [],     
       soldProducts:[         
       ], 
       selectedProduct: "",
       selecteditemIndex:-1, 
       sold: -1, 
       showShoppingCart:false, 
       show:false
    };

    this._buyProduct = this._buyProduct.bind(this);
    this._searchProducts = this._searchProducts.bind(this);   
    this._selectedProduct = this._selectedProduct.bind(this);
    this._showShoppingCart =this._showShoppingCart.bind(this);
    this._hideShoppingCart = this._hideShoppingCart.bind(this);
    this._removeProduct = this._removeProduct.bind(this);
  }

  componentDidMount() {
     let productsTest = [
          {name:"Cococola", description :"Best product ever.", price:"2.00", total: 5, imageurl :"https://image.ibb.co/fcPC5e/download.jpg"}, 
          {name:"Fanta", description :"Best product ever.", price:"3.00", total: 5, imageurl :"https://image.ibb.co/n1FoBK/fanta.jpg"},
          {name:"Sprite", description :"Best product ever.", price:"4.00", total: 5, imageurl :"https://image.ibb.co/hDG6yz/Sprite.jpg"},
          {name:"Dew", description :"Best product ever.", price:"5.00", total: 5, imageurl :"https://image.ibb.co/iaBvrK/Mountain_Dew.jpg"},
          {name:"Redbull", description :"Best product ever.", price:"6.00", total: 0, imageurl :"https://preview.ibb.co/kFDEke/Redbull.jpg"}
       ]

    this.setState({ products:productsTest})
    }

    _buyProduct(itemIndex){     
      const products = this.state.products;     
      var item = products[itemIndex];    
      item.total=item.total-1;   
      products.splice(itemIndex,1, item); 
      this.setState({products: products}); 

      let soldProducts = this.state.soldProducts;
      soldProducts.push(item);     
      this.setState({soldProducts:soldProducts})
     
      this.setState({showShoppingCart : false});
    }

    _searchProducts(value) { 
      var updatedList = this.state.initialProducts;
      updatedList = updatedList.filter((item) => {        
        return item.name.indexOf(value) !== -1;     
      });   
      this.setState({products: updatedList});     
    } 

    _selectedProduct(item, itemIndex){        
      this.setState({selecteditemIndex: itemIndex})
      this.setState({selectedProduct : item});
    }

    _showShoppingCart() {     
      if(this.state.soldProducts.length <= 0) {
       alert("Nothing in shopping cart");

      } else {           
          this.setState({showShoppingCart : true});   
      }
    }

    _hideShoppingCart(){
      this.setState({selectedProduct : ""});
      this.setState({showShoppingCart : false}); 
    }

    _goToHomePage() {            
      this.setState({showShoppingCart : true});
    }

    _removeProduct(product, itemIndex) {    
      const soldproducts = this.state.soldProducts;  
      soldproducts.splice(itemIndex,1);  
      this.setState({soldProducts:soldproducts});
          
      let products = this.state.products;   
      var prodObject = products.find(function (obj) { return obj.name === product.name; });     
      prodObject.total = prodObject.total+1;
      this.setState({products: products}); 
    }

    render() {           
      let activeComponent = null;
      let searchComponent = null;

      if(this.state.soldProducts.length > 0 && this.state.showShoppingCart) {
           activeComponent = <ShoppingCart hideShoppingCart = {this._hideShoppingCart} soldproducts = {this.state.soldProducts} removeproduct= {this._removeProduct}/>  
      } else if(this.state.selectedProduct === ""){
           activeComponent = <ProductList items = {this.state.products} buyProduct = {this._buyProduct} selectedProduct ={this._selectedProduct} />
           searchComponent = <Search searchProducts = {this._searchProducts}/>
      } else { 
           activeComponent = <ProductDetails  hideShoppingCart = {this._hideShoppingCart} index={this.state.selecteditemIndex} selectedProduct =         
                                    {this.state.selectedProduct}  buyProduct = {this._buyProduct} />
                                     searchComponent = <Search searchProducts = {this._searchProducts}/>
      }      

      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                 <a href="#" className="btn btn-success btn-lg">React-Materiel-UI</a>
              </Typography>
                  <div className="flex-container"> 
                  <div>
                    <a href="#" className="btn btn-info btn-lg" onClick={this._showShoppingCart}>
                      <span className="fas fa-shopping-cart"></span> {this.state.soldProducts.length}
                    </a>  
                    </div> 
                  </div>         
            </Toolbar>
          </AppBar>  
          <br />
            {searchComponent}
          <br />            
            {activeComponent}
        </div>
      );
    }
}

render(<App />, document.getElementById('root'));
