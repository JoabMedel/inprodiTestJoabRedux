import { useState, useRef } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import {useHistory, Link} from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({UserIsLoged}) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const DetectErrorEmail = useRef();
    const DetectErrorPassword = useRef();

    const handleEmai = (event) => {
        const email = event.target.value;
        setEmail(email);
    }

    const handlePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    }

    const OriginalInputColor = () => {
        DetectErrorEmail.current.style.border='solid 1px rgba(160, 160, 160, 0.692)'
        DetectErrorEmail.current.style.color='rgb(95, 95, 95)'
    }

    const OriginalInputPassword = () => {
        DetectErrorPassword.current.style.border='solid 1px rgba(160, 160, 160, 0.692)'
        DetectErrorPassword.current.style.color='rgb(95, 95, 95)'
    }

    const getLoged = async (event) => {
        event.preventDefault();
        try{
            const datLog = {
                "email":email,
                "password":password
            }
            const response = await axios.post('http://localhost:4000/api/login', datLog );
            if(response.status===200){
                UserIsLoged(response.data.user.name,response.data.user._id)
                history.push("/userpanel");
            }
        }catch(error){
            if(error.response.status===404){
                Swal.fire({
                    icon: 'error',
                    title: 'Ingresa un correo electrónico válido',
                    text: 'El correo electrónico no esta asociado a ninguna cuenta',
                });
                DetectErrorEmail.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorEmail.current.style.color='rgba(221, 37, 37, 0.692)'
            }else if(error.response.status===400){
                console.log("Contrasena incorrecta")
                Swal.fire({
                    icon: 'error',
                    title: 'La contraseña ingresada es incorrecta',
                });
                DetectErrorPassword.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorPassword.current.style.color='rgba(221, 37, 37, 0.692)'
            }else{
                console.log("Ocurrio un problema")
            }
        }
        
    }

    return(
        <>
            <div className="Container-Form">
                <h2 className="Tittle-font-Forms">Bienvenido de Nuevo!</h2>
                <div className="Parrafo-Font-Form">
                    <p>Ingresa con tu usuario y contraseña para acceder a la plataforma</p>
                </div>
                <form onSubmit={getLoged}>
                    <div className="Space-Between">
                        <label htmlFor="Email" className="Style-Labels-Forms">Correo Electrónico</label>
                    </div>
                    <input ref={DetectErrorEmail} required type="email" id="Email" onChange={OriginalInputColor} onInput={handleEmai} value={email} className="Inputs-Forms" placeholder="Ingresa tu Correo Electrónico"/>
                    <div className="Space-Between">
                        <label htmlFor="Password" className="Style-Labels-Forms">Contraseña</label>
                        <div>
                            <Link to="/recovery" className="Links-Style">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>
                    <input onChange={OriginalInputPassword} ref={DetectErrorPassword} required type="password" id="Password" onInput={handlePassword} value={password} className="Inputs-Forms" placeholder="Ingresa tu Contraseña"/>
                    <div className="Button-Submit-Container-Form">
                        <input type="submit" value="Ingresar" className="Button-Form-Submit"/>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    UserIsLoged(nameUser,idUser){
        dispatch({
            type: "LOGED_USER",
            LogedUser:{
                _id:idUser,
                name:nameUser,
                loged:true
            }
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)