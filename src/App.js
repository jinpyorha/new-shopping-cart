import React, { Component, Fragment } from 'react';
import Shelf from './Components/Shelf/index';
import FloatCart from './Components/FloatCart/index';
import SelectSize from './Components/SelectSize/index';
import firebase, {auth, provider} from './config/firebase.js';





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
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleToggle = this.handleToggle.bind(this)


    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

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
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  addToCart(product) {
    // const item = {
    //   user: this.state.user || this.state.user.email
    //
    // }


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



  handleChange(e) {
    /* ... */
  }
  logout() {
    auth.signOut()
  .then(() => {
    this.setState({
      user: null
    });
  });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }



  render() {
    let PRODUCTS = require('./static/data/products.json');

    return (
      <Fragment>
      <div className='app'>
      <header>
        <div className="wrapper">

          {this.state.user ?
            <button onClick={this.logout}>Logout</button>
          :
            <button onClick={this.login}>Log In</button>
          }
        </div>
      </header>
      {this.state.user ?
        <div>
          <div className='user-profile'>
        
          </div>
        </div>
        :
        <div className='wrapper'>
          <p>Login to see ur saved cart</p>
        </div>
      }
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
