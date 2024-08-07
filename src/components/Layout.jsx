import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black/90">
      <header>
        <Header />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
