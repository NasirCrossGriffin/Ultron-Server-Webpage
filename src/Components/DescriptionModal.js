import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './DescriptionModal.css';



function DescriptionModal({Technology, toggleDetails}) {
    return ReactDOM.createPortal(
        <>
            <div className="ModalBackground" onClick={() => toggleDetails(false)}></div>
            <div className="DescriptionContainer">
                <div className="TechnologyTitle">
                    <p>{Technology.name}</p>
                </div>
                <div className="TechnologyIcon">
                    <img src={Technology.icon} />
                </div>

                <div className="TechnologyDescription">
                    <p dangerouslySetInnerHTML={{ __html: Technology.description }} />
                </div>
            </div>
        </>, document.getElementById("DescriptionModal")
    )
}

export default DescriptionModal;
