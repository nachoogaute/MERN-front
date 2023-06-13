import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"

const tarea = ({tarea}) => {

    const{handleEditarTarea, handleModalEliminarTarea, completarTarea}= useProyectos()

    const {nombre, descripcion, fechaEntrega, estado, _id}= tarea
  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 ">{descripcion}</p>
            <p className="mb-1 text-sm font-serif">{formatearFecha(fechaEntrega)}</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-indigo-600 px-4 py-2 text-white uppercase font-bold 
            text-sm rounded-lg"
            onClick={()=>handleEditarTarea(tarea)}
            >Editar</button>


                <button 
                className={`${estado ? `bg-green-800` : `bg-gray-600`} px-4 py-2 text-white uppercase font-bold 
                text-sm rounded-lg`}
                onClick={()=> completarTarea(_id)}
                >{estado ? "Completa" : "Incompleta"}</button>

            <button 
            className="bg-red-700 px-4 py-2 text-white uppercase font-bold 
            text-sm rounded-lg"
            onClick={()=>handleModalEliminarTarea(tarea)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default tarea