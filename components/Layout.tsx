import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

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
