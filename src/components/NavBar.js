import React from "react";

import NavbarItem from "./NavbarItem";
import 'bootswatch/dist/sketchy/bootstrap.css'

function Navbar(props){

    return(
        
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
        <a href="/" className="navbar-brand"></a>
        
        <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem href="/casos" label="Casos" />         
                <NavbarItem href="/projetos" label="Projetos" />  
                <NavbarItem href="/createAdvogado" label="Usuários" />
                <NavbarItem href="/listarUsuarios" label="Clientes" />
            </ul>
        </div>
    </div>
</div>
    )
}

export default Navbar;
