import React, { Component } from "react";
import Header from "../Header/Header.component";

class Page extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
