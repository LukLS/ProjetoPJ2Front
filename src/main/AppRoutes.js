import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from '../components/NavBar';
import { AuthProvider } from '../contexts/AuthContext';
import { Login } from '../screens/login/login';
import { EsqueciSenha } from '../screens/esqueciSenha/EsqueciSenha';
import CreateAdvogado from "../screens/createAdvogado/CreateAdvogado";
import UpdateAdvogado from "../screens/updateAdvogado/UpdateAdvogado";
import DeleteAdvogado from "../screens/deleteAdvogado/DeleteAdvogado";
import ListarUsuario from "../screens/listarUsuarios/ListarUsuarios";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/pagina/esqueci-minha-senha" element={<EsqueciSenha/>} />
                <Route
                    path="/sessao/*" element={
                        <AuthProvider>
                            <NavBar />
                            <Routes>
                                <Route path="createAdvogado" element={<CreateAdvogado />} />
                                <Route path="listarUsuarios" element={<ListarUsuario />} />
                                <Route path="updateAdvogado" element={<UpdateAdvogado />} />
                                <Route path="deleteAdvogado" element={<DeleteAdvogado />} />
                            </Routes>
                        </AuthProvider>
                    }
                />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
