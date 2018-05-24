import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductItem from 'components/cart/ProductItem';
import { addToCart } from 'actions/cart';
import { getVisibleProducts } from 'reducers/cart/products';

class ProductList extends Component {
  render () {
    const { products, addToCart } = this.props;

    return (
      <div>
        <h3>Products</h3>
        {products.map(product => (
          <ProductItem key={product.id} product={product} onAddToCartClicked={() => addToCart(product.id)} />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
  })).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(state => ({ products: getVisibleProducts(state.cart.products) }), { addToCart })(ProductList);
