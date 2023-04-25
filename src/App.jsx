import {BrowserRouter, Routes, Route} from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/olvidePassword"
import NuevoPassword from "./paginas/nuevoPassword"
import ConfirmarCuenta from "./paginas/confirmarCuenta"


function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="Registrar" element={<Registrar/>}/>
              <Route path="Olvide-Password" element={<OlvidePassword/>}/>
              <Route path="Olvide-Password/:token" element={<NuevoPassword/>}/>
              <Route path="Confirmar-Cuenta/:id" element={<ConfirmarCuenta/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
