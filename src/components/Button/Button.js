import React from "react"
import "./Button.scss"
import { Link } from "react-router-dom"

function Button(props) {
    return (
        <Link className="Button" to={`/${props.linkTo}`}>{props.name}</Link>
    )
}

export default Button;