import { useContext } from "react";
import ProyectoContext from "../context/proyectoProvider";

const useProyectos= ()=>{
    return useContext(ProyectoContext)
}

export default useProyectos