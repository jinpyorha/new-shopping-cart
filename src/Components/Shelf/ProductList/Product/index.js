import React, { Component } from 'react';
import Thumb from '../../../Thumb'
import {formatPrice} from '../../../../utils/utils';

class Product extends Component {


  render() {

    const product = this.props.product;
    // const user = this.props.user;

    const renderButtons = product.availableSizes.map(size => {
          return (
            <button
              className="size order"
              key={size}
              onClick={() => {this.props.addToCart(product);}}>
              {size}
            </button>
          )
        })

    let formattedPrice = formatPrice(product.price, product.currencyId);
    return (
      <div
        className="shelf-item"
        data-sku={product.sku}
      >
        {product.isFreeShipping && (
          <div className="shelf-stopper">Free shippoing</div>
        )}
        <Thumb
          classes="shelf-item__thumb"
          src={require(`../../../../static/data/products/${product.sku}_1.jpg`)}
          alt={product.title}
        />
        <p className="shelf-item__title">{product.title}</p>
        <div className="shelf-item__price">
          <div className="val">
            <small>{product.currencyFormat}</small>
            <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
            <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
          </div>
        </div>
        {renderButtons}



        <div
          className="shelf-item__buy-btn"
          onClick={() => this.props.addToCart(product)}
          >
          Add to cart
        </div>




      </div>
    );
  }
}

export default Product;
