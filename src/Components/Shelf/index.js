import React, { Component, Fragment } from 'react';
import ProductList from './ProductList'
import './style.scss';

class Shelf extends Component {
  render() {
    const products = this.props.products;
    return (
      <Fragment>
        <div className="shelf-container">
          <ProductList
            products = {products}
            cartProducts = {this.props.cartProducts}
            sizes = {this.props.sizes}
            addToCart={this.props.addToCart}
            checkout={this.props.checkout}>
          </ProductList>
        </div>
      </Fragment>
    );
  }
}

export default Shelf;
