import { useState, useRef } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RecoverPassword = ({emailOk}) => {
    const [emailRecover,setEmailRecover] = useState("");
    const history = useHistory();
    const DetectErrorEmail = useRef();

    const handleEmail = (event) => {
        const email = event.target.value;
        setEmailRecover(email);
    }

    const OriginalInputColor = () => {
        DetectErrorEmail.current.style.border='solid 1px rgba(160, 160, 160, 0.692)'
        DetectErrorEmail.current.style.color='rgb(95, 95, 95)'
    }

    const getRecovery = async (event) => {
        event.preventDefault();
        try{
            const datLog = {
                "email":emailRecover
            }
            const response = await axios.post('http://localhost:4000/api/recover_password', datLog );
            if(response.status===200){
                emailOk(response.data.token)
                history.push("/ressetpassword");
            }
        }catch(error){
            if(error.response===undefined){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un problema intente mas tarde'
                });
            }
            else if(error.response.status===404){
                Swal.fire({
                    icon: 'error',
                    title: 'Ingresa un correo electrónico válido',
                    text: 'El correo electrónico no esta asociado a ninguna cuenta',
                });
                DetectErrorEmail.current.style.border='solid 1px rgba(221, 37, 37, 0.692)'
                DetectErrorEmail.current.style.color='rgba(221, 37, 37, 0.692)'
            }
        }
        
    }

    return(
        <>
            <div className="Container-Form">
                <h2 className="Tittle-font-Forms">¿Olvidaste tu contraseña?</h2>
                <div className="Parrafo-Font-Form">
                    <p>Ingresa tu Correo Electrónico y te enviaremos instrucciones para restablecer tu contraseña</p>
                </div>
                <form onSubmit={getRecovery}>
                    <div className="Space-Between">
                        <label htmlFor="Email" className="Style-Labels-Forms">Correo Electrónico</label>
                    </div>
                    <input onChange={OriginalInputColor} ref={DetectErrorEmail} required type="email" id="Email" onInput={handleEmail} value={emailRecover} className="Inputs-Forms" placeholder="Ingresa tu Correo Electrónico"/>
                    <div className="Button-Submit-Container-Form">
                        <input type="submit" value="Recuperar" className="Button-Form-Submit"/>
                    </div>
                    <div className="Link-Container">
                        <Link to="/" className="Links-Style">
                            Regresar 
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    emailOk(token){
        dispatch({
            type: "PASSWORD_RECOVERY",
            token
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(RecoverPassword)