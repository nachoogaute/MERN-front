import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/alerta"
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AuthLayout= ()=>{

    
    const[email, setEmail]= useState("")
     const[contraseña, setPassword]= useState("")
     const[alerta, setAlerta]= useState({})

     const {setAuth}= useAuth()

     const navigate= useNavigate()




    const handlesubmit= async e =>{
        e.preventDefault()

        if([email,contraseña].includes("")){
            setAlerta({
              msg:"Todos los campos son obligatorios",
              error: true
            })
            return
          }
    
    
        setAlerta({})
    
        
    
        try{
          const {data} = await axios.post("http://localhost:4000/api/usuarios/Login", {email, contraseña})
          setAlerta({})
          localStorage.setItem("token", data.token)
          setAuth(data)
          console.log(data)
          navigate('/proyectos')
    
        }catch(error){
          setAlerta({
            msg:error.response.data.msg,
            error:true
          })
          console.log(error)
        }
    
      }

      const {msg}= alerta 

    return(

        <>
        <h1 className="text-sky-900 font-black text-6xl ml-9">Iniciar Sesion</h1>

        {msg && < Alerta alerta={alerta} />}

        <form 
            className="my-10 bg-white shadow rounded-lg px-10 py-5 "
            onSubmit={handlesubmit}
        >
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
                    htmlFor="password"
                >Password</label>
                <input 
                id="password"
                type="password"
                placeholder=" Password"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={contraseña}
                onChange={e => setPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Iniciar Sesion"
                className="bg-sky-900 w-full py-3 text-white uppercase font-bold rounded 
                hover:cursor-pointer hover:bg-sky-700 transition-colors"
             />
        </form>
        <nav className=" lg:flex lg:justify-between">
            <Link
                className="mr-20  ml-10  my-5 text-slate-500 uppercase text-sm"
                to="/registrar"
            >Registrarse</Link>

            <Link
                className=" ml-32  my-5 text-slate-500 uppercase text-sm"
                to="/olvide-password"
            >Olvide Password</Link>
        </nav>
        
        </>
    )
}

export default AuthLayout