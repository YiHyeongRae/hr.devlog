import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

function Layout({ children }: any) {
  return (
    <div className="Layout">
      <Header />
      {/* <Nav /> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
