import React from "react"
import "./SearchResults.scss"
import { Link } from "react-router-dom"

function SearchResults(props) {
    return (
        <div className="SearchResults">
            <Link 
                onClick={(event) => props.onClick(event, props.link)} 
                onMouseDown={event => event.preventDefault()} 
                className="SearchResults__link" 
                to={`/event/${props.link}`}>
            <img className="SearchResults__img" src={props.image} alt="" />
            <p className="SearchResults__title">{props.title}</p>
            </Link>
        </div>
    )
}

export default SearchResults;