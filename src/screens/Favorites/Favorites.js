import React from "react"
import HeaderRender from "../../components/Header/HeaderRender"
import EventCard from "../../components/EventCard/EventCard"
import Button from "../../components/Button/Button"
import { connect } from "react-redux"
import { fetchFavorites, removeFavorites } from "../../store/actions/favorites"

class Favorites extends React.Component {

    renderEvents = () => {
        return this.props.favoritesData.map((event, index) => {
            return (
                <EventCard
                    key={index}
                    image={`./${event.image}`}
                    title={event.title}
                    description={event.description}
                    price={event.price}
                    link={event.link}
                    isFree={event.isFree}
                    isLiked={true}
                    onClickLike={this.likeRemoveHandler}>
                </EventCard>
            )
        })
    }

    likeRemoveHandler = (event) => {
        event.preventDefault()
        const likeParam = event.target.id
        this.props.removeFavorites(likeParam)
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <HeaderRender />
                    <h1>Избранное</h1>
                    <div className="container--cards">
                        {
                            this.props.favoritesData.length === 0
                            ? <div>
                                <h3>В списке избранного пусто</h3>
                                <Button name={"Перейти на главную страницу"} linkTo={"all"} />
                              </div>
                            : this.renderEvents()
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        favoritesData: state.favorites.favoritesData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFavorites: () => dispatch(fetchFavorites()),
        removeFavorites: (likeParam) => dispatch(removeFavorites(likeParam)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)