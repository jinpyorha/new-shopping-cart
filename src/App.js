import React, { Component, Fragment } from 'react';
import Shelf from './Components/Shelf/index';
import FloatCart from './Components/FloatCart/index';
import SelectSize from './Components/SelectSize/index';

// import firebase from'firebase/app';
// import auth from 'firebase/auth';
//
// firebase.initializeApp({
//   apiKey:"AIzaSyAvHabpx8h9U-Wn-HJ99qk6qJncu-uJ7RU",
//   authDomain:"newshoppingcartt.firebaseapp.com"
//
// })
//
// <script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAvHabpx8h9U-Wn-HJ99qk6qJncu-uJ7RU",
//     authDomain: "newshoppingcartt.firebaseapp.com",
//     databaseURL: "https://newshoppingcartt.firebaseio.com",
//     projectId: "newshoppingcartt",
//     storageBucket: "newshoppingcartt.appspot.com",
//     messagingSenderId: "1000236527853"
//   };
//   firebase.initializeApp(config);
// </script>



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productQuantity: 0,
      cartProducts: [],
      totalPrice: 0,
      isOpen: false,
      sizes: new Set(),
      isLogin: false,
      currentUser:null
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

    // this.authConfig = {
    //   signInFlow: "popup",
    //   signInOption:[
    //     firebase.auth.GoogleAuthorProvider.PROVIDER_ID
    //   ],
    //   callbacks: {
    //     signInSuccess: () => false
    //   }
    // }
  }

  // ComponentDidMount(){
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({
  //       isLogin: !!user,
  //       currentUser: user
  //     })
  //   })
  // }

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
