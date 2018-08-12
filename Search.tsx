import React, { Component } from 'react';
import { render } from 'react-dom';


export class Search extends React.Component {
  
  constructor(props) {
      super(props)     
      this._onChange = this._onChange.bind(this);
  }

  _onChange(e){   
    e.preventDefault(); 
    this.props.searchProducts((e.target as HTMLInputElement).value);  
  }

  render(){
      return (
         <div className="container">
            <br/>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card card-sm">
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                                <i className="fas fa-search h4 text-body"></i>
                            </div>
                          
                            <div className="col">
                                <input className="form-control form-control-lg form-control-borderless" 
                                 type="search" placeholder="Search" onChange ={this._onChange} />
                            </div>                          
                        </div>
                    </form>
                </div>                      
            </div>
        </div>
        );
      }
}