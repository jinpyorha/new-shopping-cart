import React, { Component, Fragment } from 'react';
import ProductList from './ProductList'
import './style.scss';

class Shelf extends Component {
  render() {
    const products = this.props.products.products;
    return (
      <Fragment>
        <div className="shelf-container">
          <ProductList
            products = {products}
            sizes = {this.props.sizes}
            addToCart={this.props.addToCart}>
          </ProductList>
        </div>
      </Fragment>
    );
  }
}

export default Shelf;
