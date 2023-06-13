import FormularioProyecto from "../components/formularioProyecto"

const nuevoProyecto = () => {
  return (

    <>
    <h1 className="text-4xl font-black">Nuevo Proyecto</h1>

    <div className="mt.10 flex justify-center">
      <FormularioProyecto/>
    </div>
    </>
  )
}

export default nuevoProyecto