import { useState, useRef } from "react";
import {PasswordSchema} from "./validations/passwordValidate";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";

const RessetPassword = ({UserToken}) => {
    const history = useHistory();
    const [password,setPassword] = useState("");
    const [RepeatPassword,setRepeatPassword] = useState("");
    const DetectErrorPassWords = useRef();
    const DetectErrorOtherPassWords = useRef();

    const OriginalColor = () => {
        DetectErrorPassWords.current.style.border='solid 1px rgba(160, 160, 160, 0.692)'
        DetectErrorPassWords.current.style.color='rgb(95, 95, 95)'
    }

    const OtherOriginalColor = () => {
        DetectErrorOtherPassWords.current.style.border='solid 1px rgba(160, 160, 160, 0.692)'
        DetectErrorOtherPassWords.current.style.color='rgb(95, 95, 95)'
    }

    const handlePassword = (event) => {
        const password = event.target.value;
        setPassword(password)
    }

    const handleRepeatPassword = (event) => {
        const repeatPassword = event.target.value;
        setRepeatPassword(repeatPassword)
    }

    const ressetPassword = async() => {
        let formData = {
            password:password
        }
        
        try{
            await axios.post(
                    'http://localhost:4000/api/reset_password', 
                    formData,
                    {
                        headers:{
                            Authorization: 'Bearer ' + UserToken
                        }
                    }
                
            );
        }catch(error){
            if(error.response.status===400){
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña igual a la anterior',
                    text: 'No puedes ingresar nuevamente la misma contraseña',
                });
                DetectErrorPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
                DetectErrorOtherPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorOtherPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
            }else{
                Swal.fire({
                    icon: 'Ops...',
                    title: 'Ocurrio un problema',
                    text: 'intenta mas tarde',
                });
            }
        }

    }

    const ValidatePass = async (event) => {
        let formData = {
            password:password
        }

        event.preventDefault();
        const isValid = await PasswordSchema.isValid(formData)

        if(password.length>=8){
            if(isValid){
                if(password===RepeatPassword){
                    ressetPassword()
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizacion exitosa',
                    });
                    history.push("/")
                }else{
                    console.log("No coincide")
                    Swal.fire({
                        icon: 'error',
                        title: 'La contraseña no coincide',
                        text: 'Intenta ingresarla nuevamente',
                    });
                    DetectErrorPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                    DetectErrorPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
                    DetectErrorOtherPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                    DetectErrorOtherPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Caracteres no validos',
                    text: 'Asegúrate de que la contraseña ingresada por lo menos tenga una letra mayúscula, una minúscula y un numero',
                });
                DetectErrorPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
                DetectErrorOtherPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorOtherPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Longitud no valida',
                text: 'Asegúrate de que la contraseña ingresada por lo menos tenga una longitud de 8 caracteres',
            });
            DetectErrorPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
            DetectErrorPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
            DetectErrorOtherPassWords.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
            DetectErrorOtherPassWords.current.style.color='rgba(221, 37, 37, 0.692)'
        }
    }

    

    return(
        <>
            <div className="Container-Form">
                <h2 className="Tittle-font-Forms">Restablecer Contraseña</h2>
                <div className="Parrafo-Font-Form">
                    <p>Establece tu nueva contraseña y guárdala en un lugar seguro</p>
                </div>
                <form onSubmit={ValidatePass}>
                    <div className="Space-Between">
                        <label htmlFor="NewPassword" className="Style-Labels-Forms"> Nueva Contraseña</label>
                    </div>
                    <input onChange={OriginalColor} ref={DetectErrorPassWords} required type="password" id="NewPassword" onInput={handlePassword} value={password} className="Inputs-Forms" placeholder="Ingresa Nueva contraseña"/>
                    <div className="Space-Between">
                        <label htmlFor="ConfirmPassword">Confirmar Contraseña</label>
                    </div>
                    <input onChange={OtherOriginalColor} ref={DetectErrorOtherPassWords} required type="password" id="ConfirmPassword" onInput={handleRepeatPassword} value={RepeatPassword}  className="Inputs-Forms" placeholder="Confirma Contraseña"/>
                    <div className="Button-Submit-Container-Form">
                        <input type="submit" value="Reestablecer" className="Button-Form-Submit"/>
                    </div>
                    <div className="Link-Container">
                        <Link to="/recovery" className="Links-Style">
                            Regresar 
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    UserToken: state.UserToken
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps,mapDispatchToProps)(RessetPassword)