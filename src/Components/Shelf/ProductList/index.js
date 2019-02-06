import React, { Component, Fragment } from 'react';
import Product from './Product';


class ProductList extends Component {
  componentWillReceiveProps(nextProps) {
      if (nextProps.sizes !== this.props.sizes) {
          this.forceUpdate();
      }
      if (nextProps.products.products !== this.props.products.products) {
          this.forceUpdate();
      }
  }

  render() {
    const products = this.props.products;
    const rows = [];
    const sizes = this.props.sizes;

    let selectItem = [];
    let itemSizes = [];
    for (let i = 0; i < products.length; ++i) {
      let availableSizes = products[i].availableSizes;
      for (let j = 0; j < availableSizes.length; ++j) {
        if (sizes.has(availableSizes[j])) {
          selectItem.push(products[i]);
          itemSizes.push(availableSizes[j]);
          break;
        }
      }
    }

    if (sizes.size <= 0) {
      selectItem = products;
    }

    selectItem.forEach((product) => {
      rows.push(
        <Product product={product} sizes={itemSizes} addToCart={this.props.addToCart}/>
      );
    });
    return (
      <Fragment>
        <div className="shelf-container-header">
          <small className="products-found">
            <span>{selectItem.length} Product(s) found.</span>
          </small>
        </div>
        {rows}
      </Fragment>
    );
  }
}

export default ProductList;
