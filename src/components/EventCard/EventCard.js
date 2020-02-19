import React from "react"
import { Link } from "react-router-dom"
import "./EventCard.scss"

function EventCard(props) {
    return (
        <div className="EventCard">
            <Link className="EventCard__link" to={`/event/${props.link}`} >
                <div className="EventCard__img-container">
                    <img className="EventCard__img" src={props.image} alt="" />
                </div>
                <span 
                    className={`EventCard__like ${props.isLiked ? "EventCard__like--fill" : null}`} 
                    id={props.link} 
                    onClick={props.onClickLike}>
                </span>
                <h2 className="EventCard__title">{props.title}</h2>
                <p className="EventCard__description">{props.description}</p>
                {
                    props.isFree
                        ? <span className="EventCard__bage">Бесплатно</span>
                        : <span className="EventCard__bage EventCard__bage--price">{props.price} руб.</span>
                }
            </Link>
        </div>
    )
}

export default EventCard;