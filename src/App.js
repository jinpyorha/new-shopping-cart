import React, { Component, Fragment } from 'react';
import Shelf from './Components/Shelf/index';
import FloatCart from './Components/FloatCart/index';
import SelectSize from './Components/SelectSize/index';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productQuantity: 0,
      cartProducts: [],
      totalPrice: 0,
      isOpen: false,
      sizes: new Set()
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  addToCart(product) {
    this.setState(prevState => {
      return {
        productQuantity: prevState.productQuantity + 1,
        cartProducts: prevState.cartProducts.concat(product),
        totalPrice: prevState.totalPrice + product.price
      }
    })
    this.setState({ isOpen: true })
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  removeProduct = product => {
    this.setState(prevState => {
      const { cartProducts } = prevState
      return {
        productQuantity: prevState.productQuantity - 1,
        cartProducts: cartProducts.filter(p => p.sku !== product.sku),
        totalPrice: prevState.totalPrice - product.price
      }
    })
  }

  handleToggleFilterSize(size) {
    var filterSizes = this.state.sizes;
    if (filterSizes.has(size)) {
      filterSizes.delete(size);
    } else {
      filterSizes.add(size);
    }
    this.setState({
      sizes: filterSizes,
    });
    return;
  }

  render() {
    let PRODUCTS = require('./static/data/products.json');

    return (
      <Fragment>
        <SelectSize
          className="Size"
          sizes = {this.state.sizes}
          handleToggleFilterSize={(size) => this.handleToggleFilterSize(size)}>
        </SelectSize>
        <main>
          <Shelf
            className="products"
            sizes={this.state.sizes}
            products={PRODUCTS}
            addToCart={this.addToCart}>
          </Shelf>
        </main>
        <FloatCart
          className="cart"
          cartTotal={{
            productQuantity: this.state.productQuantity,
            totalPrice: this.state.totalPrice
          }}
          cartProducts={this.state.cartProducts}
          isOpen={this.state.isOpen}
          handleToggle={this.handleToggle}
          removeProduct={this.removeProduct}>
        </FloatCart>
      </Fragment>
    );
  }
}

export default App;
