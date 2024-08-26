import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '../contexts/AuthContext';
import { Login } from '../screens/login/login';
import { EsqueciSenha } from '../screens/esqueciSenha/EsqueciSenha';
import CreateAdvogado from "../screens/createAdvogado/CreateAdvogado";
import CreateAssociado from "../screens/createAssociado/CreateAssociado";
import CreateCliente from "../screens/createCliente/CreateCliente";
import ListarUsuario from "../screens/listarUsuarios/ListarUsuarios";
import Casos from '../screens/casos/Casos';
import { PrivateRoute } from '../components/PrivateRoutes';
import NavBarLayout from '../components/NavBarLayout';  // Importar o NavBarLayout
import Projetos from '../screens/projetos/processos/Projetos';
import Status from '../screens/projetos/status/Status';
import Anexos from '../screens/projetos/anexos/Anexos'

function AppRoutes() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/pagina/esqueci-minha-senha" element={<EsqueciSenha />} />
                    <Route path="/sessao/" element={<PrivateRoute />}>
                        <Route element={<NavBarLayout />}>  {/* Usar o NavBarLayout */}
                            <Route path="createAdvogado" element={<CreateAdvogado />} />
                            <Route path="createAssociado" element={<CreateAssociado />} />
                            <Route path="createCliente" element={<CreateCliente />} />
                            <Route path="listarUsuarios" element={<ListarUsuario />} />
                            <Route path="casos" element={<Casos/>}/>
                            <Route path="projetos" element={<Projetos/>}/>
                            <Route path="status" element={<Status/>}/>
                            <Route path="anexos" element={<Anexos/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default AppRoutes;
