import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Alerta from "../components/alerta"
import axios from "axios"


const NuevoPassword = () => {

  const [tokenValido, setTokenValido]= useState(false)
  const [contraseña, setContraseña]= useState("")
  const[repetirContraseña, setRepetirContraseña]= useState("")
  const[alerta, setAlerta]= useState({})

  const params= useParams()
  const {token} =params

  useEffect(()=>{
    const comprobarToken= async ()=>{
      try{
        await axios(`http://localhost:4000/api/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      }catch(error){
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  },[token])
  
  const HandleSubmit= async e =>{
    e.preventDefault()

    if(contraseña !== repetirContraseña){
      setAlerta({
        msg:"Los contraseña no son iguales",
        error: true
      })
    }
    if(contraseña.length < 6){
      setAlerta({
        msg:"El contraseña tiene un min de 6 caracteres",
        error: true
      })
      return
    }
    setAlerta({})


    try{
      const {data}= await axios.post(`http://localhost:4000/api/usuarios/olvide-password/${token}`, {contraseña})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setContraseña("")
      setRepetirContraseña("")
    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const{msg}= alerta
  return (
    <>
    <h1 className="text-sky-900 font-black text-6xl ml-9">Restablecer Password</h1>
    {msg && <Alerta alerta={alerta}/>}

    { tokenValido && (
          <form 
          className="my-10 bg-white shadow rounded-lg px-10 py-5 "
          onSubmit={HandleSubmit}
          
      >
  
      <div className="my-5">
              <label 
                  className="uppercase text-gray-600 block my-1 text-xl font-bold" 
                  htmlFor="password"
              >Nuevo Password</label>
              <input 
              id="password"
              type="password"
              placeholder=" Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
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
              value={repetirContraseña}
              onChange={e => setRepetirContraseña(e.target.value)}
              />
          </div>
  
          <input 
              type="submit"
              value="Guardar"
              className="bg-sky-900 w-full py-3 text-white uppercase font-bold rounded 
              hover:cursor-pointer hover:bg-sky-700 transition-colors"
           />
    <nav className="pl-20 ml-10 mt-10 lg:flex lg:justify-between ">
        <Link
            className="mr-30 ml-10 text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
        >Iniciar Sesion</Link>

    </nav>
      </form>
    )}
    </>
  )
}

export default NuevoPassword