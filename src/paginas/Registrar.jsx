import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/alerta"
import axios from "axios";




const Registrar = () => {
  const[nombre, setNombre]= useState("")
  const[email, setEmail]= useState("")
  const[contraseña, setPassword]= useState("")
  const[repetirPassword, setRepetirPassword]= useState("")
  const[alerta, setAlerta]= useState({})

  const handlesubmit= async e =>{
    e.preventDefault()
    if([nombre,email,contraseña,repetirPassword].includes("")){
      setAlerta({
        msg:"Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if(contraseña !== repetirPassword){
      setAlerta({
        msg:"Los contraseña no son iguales",
        error: true
      })
    }


    setAlerta({})

    //Crear usuario
    

    try{
      const {data} = await axios.post("http://localhost:4000/api/usuarios", {nombre, email, contraseña})
      console.log(data)

      setAlerta({
        msg: data.msg,
        error: false
      })
      setNombre("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")

    }catch(error){
      setAlerta({
        msg:error.response.data.errors[0].msg,
        error:true
      })
    }

  }




  const {msg}= alerta
  return (
    <>
    <h1 className="text-sky-900 font-black text-6xl ml-9">Crear Cuenta</h1>

    {msg && < Alerta alerta={alerta} />}

    <form
     className="my-10 bg-white shadow rounded-lg px-10 py-5 "
     onSubmit={handlesubmit}
     >
    <div className="my-5">
            <label 
                className="uppercase text-gray-600 block my-1 text-xl font-bold" 
                htmlFor="name"
            >Nombre</label>
            <input 
            id="name"
            type="text"
            placeholder=" Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />
        </div>
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block my-1 text-xl font-bold" 
                htmlFor="contraseña"
            >Password</label>
            <input 
            id="contraseña"
            type="password"
            placeholder=" Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={contraseña}
            onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="my-5">
            <label 
                className="uppercase text-gray-600 block my-1 text-xl font-bold" 
                htmlFor="password2"
            >Repetir Password</label>
            <input 
            id="password2"
            type="password"
            placeholder=" Repetir Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            value="Crear Cuenta"
            className="bg-sky-900 w-full py-3 text-white uppercase font-bold rounded 
            hover:cursor-pointer hover:bg-sky-700 transition-colors"
         />
    </form>
    <nav className="lg:flex lg:justify-between ">
        <Link
            className="mr-20  ml-10 ml-10 text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
        >Iniciar Sesion</Link>

    </nav>
    
    </>
  )
}

export default Registrar