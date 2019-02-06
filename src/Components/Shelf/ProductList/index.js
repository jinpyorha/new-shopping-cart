import React, { Component, Fragment } from 'react';
import Product from './Product';


class ProductList extends Component {
  render() {
    const products = this.props.products;
    const rows = [];
    const sizes = this.props.sizes;

    products.forEach((product) => {
      rows.push(
        <Product product={product} addToCart={this.props.addToCart}/>
      );
    });
    return (
      <Fragment>
        <div className="shelf-container-header">
          <small className="products-found">
            <span>{products.length} Product(s) found.</span>
          </small>
        </div>
        {rows}
      </Fragment>
    );
  }
}

export default ProductList;
