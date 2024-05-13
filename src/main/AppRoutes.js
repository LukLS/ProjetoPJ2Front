import React from "react";
import {Route, BrowserRouter} from "react-router-dom"

import ViewUser from "../screens/viewUser/ViewUser";
import CreateAdvogado from "../screens/createAdvogado/CreateAdvogado";
import UpdateAdvogado from "../screens/updateAdvogado/UpdateAdvogado";
import DeleteAdvogado from "../screens/deleteAdvogado/DeleteAdvogado";
import ListarUsuario from "../screens/listarUsuarios/ListarUsuarios"


function AppRoutes(){
    return(
        <BrowserRouter>
        <Route component = {ViewUser} path="/"exact />
        <Route component = {ViewUser} path="/viewUser" />
        <Route component = {CreateAdvogado} path="/createAdvogado"/>
        <Route component = {ListarUsuario} path="/listarUsuarios"/>
        <Route component = {UpdateAdvogado} path="/updateAdvogado"/>
        <Route component = {DeleteAdvogado} path="/deleteAdvogado"/>
        </BrowserRouter>
    );
}

export default AppRoutes;