import React from "react";
import errorIcon from '../../assets/icons/ic_error.PNG';
import "./Error.sass"

// Componente utilizado para mostar los mensajes de error en la aplicacion
function Error(props) {
    const handleTryAgain = () => {
        window.location.reload();
    }

    return (
        <div className="error-wrapper">
            <div className="error">
                <img className="error_icon" src={errorIcon} alt="Error"></img>
                <p>¡Uy! Algo salio mal...</p>
                <p className="message">{props.message}</p>
                <button className="btn-try-again" onClick={handleTryAgain}>Intentar nuevamente</button>
            </div>
        </div>
    );
};

export default Error;