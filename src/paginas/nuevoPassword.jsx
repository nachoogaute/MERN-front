

const nuevoPassword = () => {
  return (
    <>
    <h1 className="text-sky-900 font-black text-6xl ml-9">Restablecer Password</h1>

    <form className="my-10 bg-white shadow rounded-lg px-10 py-5 ">

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
            />
        </div>

        <input 
            type="submit"
            value="Guardar"
            className="bg-sky-900 w-full py-3 text-white uppercase font-bold rounded 
            hover:cursor-pointer hover:bg-sky-700 transition-colors"
         />
    </form>
    </>
  )
}

export default nuevoPassword