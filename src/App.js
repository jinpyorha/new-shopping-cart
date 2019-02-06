import React, { Component, Fragment } from 'react';
import Shelf from './Components/Shelf/index';

class App extends Component {

  render() {
    let PRODUCTS = require('./static/data/products.json');

    return (
      <Fragment>
        <main>
          <Shelf
            className="products"
            sizes={this.state.sizes}
            products={PRODUCTS}>
          </Shelf>
        </main>
      </Fragment>
    );
  }
}

export default App;
