

const alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? `from-red-900 to-red-600` : `from-sky-400 
    to-sky-600`}bg-gradient-to-br text-center p-3 rounded-xl uppercase text-black
    font-bold text-sm my-10`}>
        {alerta.msg}
    </div>
  )
}

export default alerta