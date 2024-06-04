import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";

//components
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default RootLayout;
