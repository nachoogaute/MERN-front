import { useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/alerta"
import { useParams } from "react-router-dom"



const FormularioProyecto = () => {
    const [id, setId]= useState(null)
    const [nombre, setNombre]= useState("")
    const [descripcion, setDescripcion]= useState("")
    const [fechaEntrega, setFechaEntrega]= useState("")
    const [cliente, setCliente]= useState("")

    const params= useParams()
    const{mostrarAlerta, alerta, submitProyecto, proyecto}= useProyectos()

    useEffect(()=>{
        if(params.id){
            setId(proyecto.uid)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])

    const handleSubmit= async e=>{
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, cliente].includes("")){
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})

        setId(null)
        setNombre("")
        setDescripcion("")
        setFechaEntrega("")
        setCliente("")
    }

    const {msg}= alerta 

    
  return (
    <form 
        className="bg-white mt-5 py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        {msg && < Alerta alerta={alerta} />}
        <div className="mb-5">
            <label
                className="text-gray-900 uppercase font-bold text-sm"
                htmlFor="nombre"
            >Nombre Proyecto</label>

            <input
                id="nombre"
                type="text"
                className="border w-full p-3 mt-3 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Proyecto"
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-900 uppercase font-bold text-sm"
                htmlFor="descripcion"
            >Descripcion</label>

            <textarea
                id="descripcion"
                className="border w-full p-3 mt-3 placeholder-gray-400 rounded-md"
                placeholder="Descripcion del Proyecto"
                value={descripcion}
                onChange={e=> setDescripcion(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-900 uppercase font-bold text-sm"
                htmlFor="fechaEntrega"
            >FechaEntrega</label>

            <input
                id="fechaEntrega"
                type="date"
                className="border w-full p-3 mt-3 placeholder-gray-400 rounded-md"
                value={fechaEntrega}
                onChange={e=> setFechaEntrega(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label
                className="text-gray-900 uppercase font-bold text-sm"
                htmlFor="cliente"
            >Cliente</label>

                <input
                id="cliente"
                type="text"
                className="border w-full p-3 mt-3 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Cliente"
                value={cliente}
                onChange={e=> setCliente(e.target.value)}
                />
        </div>

        <input
            type="submit"
            value={proyecto.uid ? "Actualizar Proyecto" : "Crear Proyecto"}
            className="bg-sky-900 w-full mt-3 p-3 uppercase font-bold text-white
            rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
    </form>
  )
}

export default FormularioProyecto