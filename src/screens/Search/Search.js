import React from "react"
import HeaderRender from "../../components/Header/HeaderRender"
import Button from "../../components/Button/Button"
import EventCard from "../../components/EventCard/EventCard"
import Loader from "../../components/Loader/Loader"
import { connect } from "react-redux"
import { createBrowserHistory } from "history"
import { fetchSearchResult, fetchEmptySearch } from "../../store/actions/search"

import { addFavorites, removeFavorites } from "../../store/actions/favorites"

class Search extends React.Component {

    componentDidMount() {
        const history = createBrowserHistory()
        const searchRequest = decodeURI(history.location.hash.substring(12))

        if (searchRequest === "") {
            this.props.fetchEmptySearch()
        } else {
            this.props.fetchSearchResult(searchRequest)
        }
    }

    likeHandler = (event) => {
        event.preventDefault()
        const likeParam = event.target.id
        if (this.props.favoritesData.find(item => item.link === likeParam)) {
            this.props.removeFavorites(likeParam)
        } else {
            this.props.addFavorites(likeParam)
        }
    }

    renderEvents = () => {
        return this.props.searchResultData.map((event, index) => {
            return (
                <EventCard
                    key={index}
                    image={`./${event.image}`}
                    title={event.title}
                    description={event.description}
                    price={event.price}
                    link={event.link}
                    isFree={event.isFree}
                    onClickLike={this.likeHandler}
                    isLiked={event.isLiked}>
                </EventCard>
            )
        })
    }

    renderEmptySearh = () => {
        return (
            <div>
                <h3>Для поиска по сайту воспользуйтесь формой выше</h3>
                <Button name={"Перейти на главную страницу"} linkTo={"all"} />
            </div>
        )
    }

    renderEmptySearchResultData = () => {
        return (
            <div>
                <h3>По запросу «{this.props.searchRequest}» ничего не найдено</h3>
                <Button name={"Перейти на главную страницу"} linkTo={"all"} />
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="Search container">
                    <HeaderRender />
                    <h1>Результаты поиска</h1>
                    <div className="container--cards">
                        {
                            this.props.loading && this.props.isSearchEmpty
                                ? <Loader />
                                : this.props.isSearchEmpty
                                    ? this.renderEmptySearh()
                                    : this.props.searchResultData.length === 0
                                        ? this.renderEmptySearchResultData()
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
        searchResultData: state.search.searchResultData,
        favoritesData: state.favorites.favoritesData,
        searchRequest: state.search.searchRequest,
        loading: state.search.loading,
        isSearchEmpty: state.search.isSearchEmpty
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSearchResult: (searchRequest) => dispatch(fetchSearchResult(searchRequest)),
        addFavorites: (likeParam) => dispatch(addFavorites(likeParam)),
        removeFavorites: (likeParam) => dispatch(removeFavorites(likeParam)),
        fetchEmptySearch: () => dispatch(fetchEmptySearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)