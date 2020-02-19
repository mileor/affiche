import React from "react"
import "./TabButton.scss"
import { Link } from "react-router-dom"

function TabButton(props) {
    return (
        <Link 
            to={`/${props.id}`}
            className={`TabButton ${(props.isSelected ? "TabButton--active" : "")}`}
            id={props.id} 
            onClick={props.onClick}>
            {props.name}
        </Link>
    )
}

export default TabButton;