import React, { Component } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import { ON_SCREEN_MODE, ON_SEARCH_INPUT } from "../redux/types";

class Interface extends Component {
  render() {
    if (this.props.screenMode === 0) {
      //0 ise use for products screen and 1 for shopping cart screen
      return (
        <>
          <button
            onClick={() =>
              this.props.dispatch({ type: ON_SCREEN_MODE, payload: 1 })
            }
          >
            View shopping cart
          </button>
          <input
            type="text"
            onInput={(e) => {
              this.props.dispatch({
                type: ON_SEARCH_INPUT,
                payload: e.target.value,
              });
            }}
          />

          {this.props.apiData ? (
            this.props.filtered.length ? ( //if search term has produced results use filtered data
              this.props.filtered.map((product) => {
                return <Product key={product.id} product={product} />;
              })
            ) : (
              this.props.apiData.map((product) => {
                return <Product key={product.id} product={product} />;
              })
            )
          ) : (
            <h1>Loading API Data</h1>
          )}
        </>
      );
    } else {
      return <ShoppingCart />;
    }
  }
}

function mapStateToProps(state) {
  return {
    apiData: state.apiData,
    filtered: state.filtered,
    screenMode: state.screenMode,
  };
}

export default connect(mapStateToProps)(Interface);
