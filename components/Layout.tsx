import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideTagNav from "./SideTagNav";

function Layout({ children }: any) {
  return (
    <div className="Layout">
      <Header />
      {/* <Nav /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#1e1e1f",
        }}
      >
        <SideTagNav />
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
