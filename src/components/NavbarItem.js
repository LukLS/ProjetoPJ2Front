import React from "react";
import { Link } from "react-router-dom";

function NavbarItem({ href, label }) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={href}>{label}</Link>
        </li>
    );
}

export default NavbarItem;
