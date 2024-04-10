import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";

//components
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <TopNav />
      </header>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout
