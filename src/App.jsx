import {BrowserRouter, Routes, Route} from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/olvidePassword"
import NuevoPassword from "./paginas/nuevoPassword"
import ConfirmarCuenta from "./paginas/confirmarCuenta"
import Proyectos from "./paginas/proyectos"
import RutaProtegida from "./layouts/rutaProtegida"
import NuevoProyecto from "./paginas/nuevoProyecto"
import Proyecto from "./paginas/proyecto"
import EditarProyecto from "./paginas/editarProyecto"

import { AuthProvider } from "./context/authProvider"
import { ProyectoProvider } from "./context/proyectoProvider"


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectoProvider>
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="Registrar" element={<Registrar/>}/>
              <Route path="Olvide-Password" element={<OlvidePassword/>}/>
              <Route path="Olvide-Password/:token" element={<NuevoPassword/>}/>
              <Route path="Confirmar-Cuenta/:id" element={<ConfirmarCuenta/>}/>
            </Route>
            <Route path="/proyectos" element={<RutaProtegida/>}>
              <Route index element={<Proyectos/>}/>
              <Route path="crear-proyecto" element={<NuevoProyecto/>}/>
              <Route path=":id" element={<Proyecto/>}/>
              <Route path="editar/:id" element={<EditarProyecto/>}/>

            </Route>
        </Routes>
        </ProyectoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
