import React from "react";
import Loader from "react-loader-spinner";
import "./CustomLoader.sass"

function CustomLoader() {
    return (
        <div className="loader-wrapper">
            <Loader type="TailSpin" color="#00BFFF" height={160} width={160} />
        </div>
    );
};

export default CustomLoader;