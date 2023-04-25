import { Link } from "react-router-dom"


const olvidePassword = () => {
  return (
    <>
    <h1 className="text-sky-900 font-black text-6xl ml-9">Recuperar Acceso</h1>

    <form className="my-10 bg-white shadow rounded-lg px-10 py-5 ">
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block my-1 text-xl font-bold" 
                htmlFor="email"
            >Email</label>
            <input 
            id="email"
            type="email"
            placeholder=" Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
        </div>
        <input 
            type="submit"
            value="Enviar Confirmacion"
            className="bg-sky-900 w-full py-3 text-white uppercase font-bold rounded 
            hover:cursor-pointer hover:bg-sky-700 transition-colors"
         />
    </form>
    <nav className="lg:flex lg:justify-between ">
        <Link
            className="mr-20  ml-10 ml-10 text-center my-5 text-slate-500 uppercase text-sm"
            to="/registrar"
        >Registrarse</Link>
        <Link
            className=" ml-32  my-5 text-slate-500 uppercase text-sm"
            to="/"
        >Iniciar Sesion</Link>

    </nav>
    
    </>
  )
}

export default olvidePassword