import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const NavBarLayout = () => {
  return (
    <div>
      <NavBar />
      <div style={{}}> {/* Adicione paddingTop para evitar sobreposição */}
        <Outlet />
      </div>
    </div>
  );
};

export default NavBarLayout;
