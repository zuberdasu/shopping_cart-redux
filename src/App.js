import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { SET_API_DATA } from "./redux/types";
import Interface from "./components/Interface";

class App extends Component {
  async componentDidMount() {
    const url = "https://fakestoreapi.com/products";
    try {
      const result = await axios.get(url);
      this.props.dispatch({ type: SET_API_DATA, payload: result.data });
    } catch (error) {
      console.log("Error from API", error);
    }
  }
  render() {
    return <Interface />;
  }
}

export default connect()(App);
