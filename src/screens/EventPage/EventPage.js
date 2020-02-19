import React from "react"
import "./EventPage.scss"
import HeaderRender from "../../components/Header/HeaderRender"
import { fetchEvent } from "../../store/actions/event"
import { connect } from "react-redux"

class EventPage extends React.Component {

    componentDidMount() {
        const eventId = this.props.match.params.link
        this.props.fetchEvent(eventId)
    }

    render() {
        return (
            <React.Fragment>
                <div className="EventPage container">
                    <HeaderRender />
                    <img className="EventPage__img" src={`./${this.props.eventData.image}`} alt={this.props.eventData.link} />
                    <h1 className="EventPage__title">{this.props.eventData.title}</h1>
                    {
                        this.props.eventData.isFree
                            ? <span className="EventPage__bage">Бесплатно</span>
                            : <span className="EventPage__bage EventPage__bage--price">{this.props.eventData.price} руб.</span>
                    }
                    <p className="EventPage__text">{this.props.eventData.body}</p>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        eventData: state.event.eventData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)