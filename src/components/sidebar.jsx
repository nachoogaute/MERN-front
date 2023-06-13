import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

    const {auth}= useAuth()
  return (
    <aside className="md:w-80 lg:w-50 px- py-10">
        <p className=" text-xl font-bold">Hola: {auth.nombre} </p>

        <Link
            to="crear-proyecto"
            className="bg-sky-900 w-full p-3 text-white uppercase font-bold block mt-3 text-center rounded-lg"
        >Nuevo Proyecto</Link>

    </aside>
  )
}

export default Sidebar