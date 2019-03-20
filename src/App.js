import React, { Component, Fragment } from 'react';
import Shelf from './Components/Shelf/index';
import FloatCart from './Components/FloatCart/index';
import SelectSize from './Components/SelectSize/index';

import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth'
//import firebase from 'firebase';
//import firebase, {auth, provider} from './config/firebase.js';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


firebase.initializeApp({
  apiKey: "AIzaSyAvHabpx8h9U-Wn-HJ99qk6qJncu-uJ7RU",
  authDomain: "newshoppingcartt.firebaseapp.com",
  databaseURL: "https://newshoppingcartt.firebaseio.com",
  projectId: "newshoppingcartt",
  storageBucket: "newshoppingcartt.appspot.com",
  messagingSenderId: "1000236527853"

})


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productQuantity: 0,
      products: [],
      cartProducts: [],
      size_buttons: ["S","M","L","XL"],     // Don't need.
      totalPrice: 0,
      isOpen: false,
      sizes: new Set(),
      signedIn: false,
      currentUser: null,
      data: [],
      cart: []
    }

    this.addToCart = this.addToCart.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

    this.authConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    this.db = firebase.database();
    this.auth = firebase.auth();

    //this.login = this.login.bind(this);
    //this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    /*
    let all_products = [];
    firebase.database().ref('products/').orderByChild('0').on('value', snapshot => {
      this.state.all_products = snapshot.val();
    });

    import("./static/data/products.json").then(json => {
      this.setState({ products: json.products });
    }).catch(error => {
      alert(error);
    });
    */
    this.data().once('value', snapshot => {
      let existing = snapshot.val()
      if (existing) {
        console.log(existing)
        this.setState({
          data: Object.keys(existing).map(key => ({
            ...existing[key]
          }))
        })
      }
    })
    this.auth.onAuthStateChanged(user => {
      this.setState({
        signedIn: !!user,
        currentUser: user
      })

      if (user) {
        this.cart(user.uid).once('value', snapshot => {
          let existing = snapshot.val()
          if (existing) {
            let cart = Object.keys(existing).map(key => ({
              ...existing[key]
            }))
            this.setState({
              productQuantity: cart.length,
              cart: cart
            })
          }
        })
      } else {
        this.setState({
          productQuantity: 0,
          cart: []
        })
      }
    })
  }

  user = uid => this.db.ref(`users/${uid}`)
  cart = uid => this.db.ref(`users/${uid}/cart`)
  data = () => this.db.ref(`products`)

  addToCart(product) {
    this.setState(prevState => {
      return {
        productQuantity: prevState.productQuantity + 1,
        cartProducts: prevState.cartProducts.concat(product),
        totalPrice: prevState.totalPrice + product.price
      }
    })
    this.setState({
      isOpen: true,
      user: this.state.user
    })
  }

  // Cart menu popup boolean state.
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
  /*
  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null});
      });
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user});
    });
  }
  */
  render() {
    let shown = [];

    return (
      <Fragment>
      <div className='app'>
      <header>
        <div className="wrapper">
          {this.state.signedIn ?
            <div>
            <h1>Hi {this.auth.currentUser.displayName}</h1>
            <button onClick={() => this.auth.signOut()}>Log out</button>
            </div>
            :
            <StyledFireBaseAuth
              uiConfig={this.authConfig}
              firebaseAuth={this.auth}/>
          }
        </div>
      </header>
    </div>
        <SelectSize
          className="Size"
          sizes = {this.state.sizes}
          handleToggleFilterSize={(size) => this.handleToggleFilterSize(size)}>
        </SelectSize>
        <main>
          <Shelf
            className="products"
            sizes={this.state.sizes}
            size_order={this.state.size_buttons}
            products={this.state.data}
            cartProducts={this.state.cartProducts}
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
