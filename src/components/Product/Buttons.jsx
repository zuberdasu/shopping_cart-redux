import React, { Component } from "react";
import { connect } from "react-redux";
import { ON_BUY_NOW } from "../../redux/types";

class Buttons extends Component {
  render() {
    return (
      <button
        onClick={() => {
          this.props.dispatch({
            type: ON_BUY_NOW,
            payload: this.props.id,
          });
        }}
      >
        Buy Now
      </button>
    );
  }
}

export default connect()(Buttons);
