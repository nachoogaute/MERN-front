// eslint-disable-next-line no-unused-vars
import { useEffect, useState, createContext } from "react"

import axios from "axios";
import {useNavigate} from "react-router-dom"
import useProyectos from "../hooks/useProyectos";


const ProyectoContext= createContext()

const ProyectoProvider = ({children}) => {

  const[proyectos, setProyectos]= useState([])
  const [alerta, setAlerta]= useState({})
  const [proyecto, setproyecto]= useState({})
  const [cargando, setCargando]= useState(false)
  const[ modalTarea, setModalTarea]= useState(false)
  const[tarea, setTarea]= useState({})
  const[modalEliminarTarea, setModalEliminarTarea]= useState(false)
  const [buscador, setBuscador]= useState(false)




  const navigate= useNavigate()

  useEffect(()=>{
    const obtenerProyectos= async()=>{
      try{
        const token= localStorage.getItem("token")
        if(!token)return
  
        const config={
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        }
        const {data}= await axios("http://localhost:4000/api/proyectos", config)
        setProyectos(data)
      }catch(error){
        console.log(error.response)
      }
    }
    obtenerProyectos()
  }, [])


  const mostrarAlerta= alerta =>{
    setAlerta(alerta)
    setTimeout(()=>{
      setAlerta({})
    }, 5000)
  }

  const submitProyecto= async proyecto=>{

    if(proyecto.id){
      await editarProyecto(proyecto)
    }else{
      await nuevoProyecto(proyecto)
    }

  }

  const obtenerProyecto= async id =>{
    try{
      setCargando(true)
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }

      const {data}= await axios(`http://localhost:4000/api/proyectos/${id}`, config)
      setproyecto(data)
    }catch(error){
      console.log(error)
    }
    setCargando(false)
  }

  const nuevoProyecto= async proyecto=>{
    try{
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }

      const {data}= await axios.post("http://localhost:4000/api/proyectos",proyecto, config)
      setProyectos([...proyectos, data])

      setAlerta({
        msg: "Proyecto Creado Correctamete",
        error: false
      })

      setTimeout(()=>{
        setAlerta({})
        navigate("/proyectos")
      },3000)


    }catch(error){
      setProyectos({})
      console.log(error.response)
    }
  }

  const editarProyecto= async proyecto=>{
    try{
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      const {data}= await axios.put(`http://localhost:4000/api/proyectos/${proyecto.id}`,proyecto, config)
      
      const proyectosActualizados= proyectos.map(proyectoState => proyectoState.uid 
        === data.uid ? data : proyectoState)
        setProyectos(proyectosActualizados)
        
       
      setAlerta({
        msg: "Proyecto Actualizado Correctamete",
        error: false
      })

      setTimeout(()=>{
        setAlerta({})
        navigate("/proyectos")
      },3000)

    }catch(error){
      console.log(error)
    }
  }

  const eliminarProyecto= async id =>{
    try{

      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      const {data}= await axios.delete(`http://localhost:4000/api/proyectos/${id}`, config)
      const proyectosActualizados= proyectos.filter(proyectoState => proyectoState.uid 
        !== id)
      setProyectos(proyectosActualizados)

      setAlerta({
        msg: "Proyecto Eliminado Correctamete",
        error: false
      })

      setTimeout(()=>{
        setAlerta({})
        navigate("/proyectos")
      },3000)


    }catch(error){
      console.log(error)
    }
  }

  const handleModalTarea= ()=>{
    setModalTarea(!modalTarea)
    setTarea({})
  }

  const submitTarea= async tarea=>{

    if(tarea?.id){
      editarTarea(tarea)
    }else{
     await crearTarea(tarea)
    }

  }

  const crearTarea= async tarea=>{
    try{
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }

      const {data}= await axios.post("http://localhost:4000/api/tareas",tarea, config)
      console.log(data)
      
      const proyectoActualizado= {...proyecto}
      proyectoActualizado.tareas= [...proyecto.tareas, data]
      setproyecto(proyectoActualizado)

      setAlerta({})
      setModalTarea(false)




    }catch(error){
      console.log(error.response)
    }
  }

  const handleEditarTarea= tarea =>{
    setTarea(tarea)
    setModalTarea(true)
  }

  const editarTarea= async tarea=>{
    try{
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      const {data}= await axios.put(`http://localhost:4000/api/tareas/${tarea.id}`,tarea, config)

      const proyectoActualizado= {...proyecto}
      proyectoActualizado.tareas= proyectoActualizado.tareas.map( tareaState =>
      tareaState._id === data._id ? data : tareaState)


      setproyecto(proyectoActualizado)
      setAlerta({})
      setModalTarea(false)

    }catch(error){
      console.log(error)
    }
  }

  const handleModalEliminarTarea= tarea=>{
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }

  const eliminarTarea= async()=>{
    try{
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      const {data}= await axios.delete(`http://localhost:4000/api/tareas/${tarea._id}`, config)
      setAlerta({
        msg: data.msg,
        error: false
      })
   
      const proyectoActualizado= {...proyecto}
      proyectoActualizado.tareas= proyectoActualizado.tareas.filter(tareaState => tareaState._id 
        !== tarea._id)


      setproyecto(proyectoActualizado)
      setModalEliminarTarea(false)
      setTarea({})

      setTimeout(()=>{
        setAlerta({})
      }, 3000)

    }catch(error){
      console.log(error)
    }
  }

  const completarTarea= async id =>{
    try{
      const token= localStorage.getItem("token")
      if(!token)return

      const config={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      const {data}= await axios.post(`http://localhost:4000/api/tareas/estado/${id}`,{}, config)

      const proyectoActualizado= {...proyecto}

      proyectoActualizado.tareas= proyectoActualizado.tareas.map(tareaState =>
      tareaState._id === data._id ? data : tareaState)

        setproyecto(proyectoActualizado)
        setTarea({})
        setAlerta({})

    }catch(error){
      console.log(error)

    }
  }

  const handleBuscador= ()=>{
    setBuscador(!buscador)
  }

  return (
    <ProyectoContext.Provider
        value={{
          proyectos,
          mostrarAlerta,
          alerta,
          submitProyecto,
          obtenerProyecto,
          proyecto,
          cargando,
          eliminarProyecto,
          modalTarea,
          handleModalTarea,
          submitTarea,
          handleEditarTarea,
          tarea,
          editarTarea,
          modalEliminarTarea,
          handleModalEliminarTarea,
          eliminarTarea,
          completarTarea,
          handleBuscador,
          buscador
        }}
    >   {children}
    </ProyectoContext.Provider>
  )
}

export{
    ProyectoProvider
}

export default ProyectoContext