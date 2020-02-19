import React from "react"
import "./Select.scss"

function Select(props) {
    return (
        <button className="Select" onClick={props.onClick}>
            {
                props.isAscendingPrice
                    ? <span><i className="Select__icon fas fa-sort-amount-up-alt"></i> По возрастанию цены</span>
                    : <span><i className="Select__icon fas fa-sort-amount-up"></i> По убыванию цены</span>
            }
        </button>
    )
}

export default Select;