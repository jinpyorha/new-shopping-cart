import React, { Component} from 'react';
import CartProduct from './CartProduct';
import { formatPrice } from '../../utils/utils';
import './style.scss';

class FloatCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render() {
     const { cartTotal, cartProducts, removeProduct, checkout } = this.props;
    const products =  cartProducts.map(product => {
      return (
        <CartProduct product={product} removeProduct={removeProduct} key={product.id} checkout={checkout}/>
      );
    })
    let classes = ['float-cart'];

    if (this.props.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.isOpen && (
          <div
            onClick={() => this.props.handleToggle()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {!this.props.isOpen && (
          <span
            onClick={() => this.props.handleToggle()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quanttity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
            <span className="header-title">Shopping Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`$ ${formatPrice(
                  cartTotal.totalPrice,
                  cartTotal.currencyId
                )}`}
              </p>
            </div>
            <div
              onClick={()=>this.props.checkout()}
              className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FloatCart;
