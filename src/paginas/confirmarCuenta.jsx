import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import Alerta from "../components/alerta"

const ConfirmarCuenta = () => {

  const [alerta, setAlerta]= useState({})
  const [cuentaConfirmada, setCuentaConfirmada]= useState(false)


  const params= useParams()
  const {id} =params

  useEffect(()=>{
    const confirmarCuenta= async()=>{
      try{
        const url= `http://localhost:4000/api/usuarios/confirmar/${id}`
        const{data}= await axios(url)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      }catch(error){
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }
    }
    confirmarCuenta()
  },[id])

  const {msg}= alerta
  
  return (
    <>
        <h1 className="text-sky-900 font-black text-6xl ml-9">Confirmar</h1>

        <div>
          {msg && <Alerta alerta={alerta}/>}
          {cuentaConfirmada && (
            <Link
                className="mr-20  ml-10 ml-10 text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
             >Inciar Sesion</Link>
          )}
        </div>

    </>
  )
}

export default ConfirmarCuenta