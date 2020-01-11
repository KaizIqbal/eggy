import React, { Component } from "react";
import Header from "../Header/Header.component";

class Page extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
      </>
    );
  }
}

export default Page;
