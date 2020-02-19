import React from "react"
import "./SearchInput.scss"
import { Link } from "react-router-dom"

function SearchInput(props) {
    return (
        <div className="SearchInput">
            <input 
                className="SearchInput__input" 
                onChange={(event) => props.onChange(event)} 
                onKeyDown={props.onKeyDown} 
                onFocus={props.onFocus} 
                onBlur={props.onBlur} 
                type="text" 
                placeholder="Поиск по событиям..." 
            />
            <Link 
                className="SearchInput__link" 
                onClick={props.onClick}
                type="button"
                to={`/search/?q=${props.searchRequest}`}>
                Искать
            </Link>
        </div>
    )
}

export default SearchInput;