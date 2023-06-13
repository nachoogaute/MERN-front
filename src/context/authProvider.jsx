import { useState, useEffect, createContext } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';


const AuthContext= createContext()




const AuthProvider= ({children})=>{

    const [auth, setAuth]= useState({})
    const [cargando, setCargando]= useState(true)

   // const navigate= useNavigate()

    useEffect(()=>{
        const autenticarUsuario= async()=>{
            
            const token= localStorage.getItem("token")
            if(!token){
                setCargando(false)
                return
            }

            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            try{
                const {data}= await axios("http://localhost:4000/api/usuarios/perfil", config)
                setAuth(data)
        //        navigate("/proyectos")
            }catch(error){
                setAuth({})
                console.log(error.response)
            }
            setCargando(false)
        }
        autenticarUsuario()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando
        }}
        >
            {children}
        </AuthContext.Provider>
        
        )
        
    }
    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
export {
    AuthProvider
}

export default AuthContext