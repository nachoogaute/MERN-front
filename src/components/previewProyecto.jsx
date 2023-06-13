import { Link } from "react-router-dom"



const PreviewProyecto = ({proyecto}) => {
    const{nombre,uid,cliente}= proyecto
   
  return (
    <div className="border-b p-5 flex">

    <p className="flex-1">
      <strong>{nombre}</strong>
      <span className=" text-sm text-gray-500 uppercase p-3">
        {""} {cliente}
      </span>
    </p>

    <Link
        to={`${uid}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
    > Ver Proyecto</Link>

    </div>


  )
}




export default PreviewProyecto