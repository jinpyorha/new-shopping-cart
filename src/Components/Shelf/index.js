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
            size_order = {this.props.size_order}
            addToCart={this.props.addToCart}>
          </ProductList>
        </div>
      </Fragment>
    );
  }
}

export default Shelf;
