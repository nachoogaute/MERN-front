import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./busqueda"

const Header = () => {

  const {handleBuscador}= useProyectos()
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-900 font-black text-center">
          UpTask
        </h2>

        <div className="flex items-center gap-4">
          <button
          type="button"
          className="font-bold uppercase"
          onClick={handleBuscador}
          >Buscar Proyecto</button>
        <Link
            to="/proyectos"
            className="font-bold uppercase"
        >Proyectos</Link>

        <button
            type="button"
            className="text-white text-sm bg-sky-900 p-3 rounded-md uppercase font-bold"
        >Cerrar Sesion</button>

        <Busqueda/>

        </div>  
      </div>
    </header>
  )
}

export default Header