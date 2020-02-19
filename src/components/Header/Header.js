import React from "react"
import SearchInput from "../Search/SearchInput"
import SearchResults from "../Search/SearchResults"
import "./Header.scss"
import Loader from "../Loader/Loader"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { fetchSearchResult, clearSearchResult, fetchSearchRequest, showSearchDropdown, hideSearchDropdown, fetchEmptySearch } from "../../store/actions/search"
import { fetchEvent } from "../../store/actions/event"

class Header extends React.Component {

    searchHandler = (event) => {
        if (this.props.searchRequest === "" || document.querySelector(".SearchInput__input").value === "") {
            event.preventDefault()
        } else {
            document.querySelector(".SearchInput__input").value = ""
            this.props.hideSearchDropdown()
        }
    }

    changeHandler = (event) => {
        let searchRequest = event.target.value
        this.props.fetchSearchRequest(searchRequest)

        if (searchRequest.trim().length > 0) {
            this.props.fetchSearchResult(searchRequest)
            this.props.showSearchDropdown()
        } else {
            this.props.clearSearchResult()
            this.props.hideSearchDropdown()
        }
    }

    renderSearchResults = () => {
        return this.props.searchResultData.map((event, index) => {
            return (
                <SearchResults
                    key={index}
                    image={`./${event.image}`}
                    title={event.title}
                    link={event.link}
                    onClick={this.linkChangeHandler} 
                />
            )
        })
    }

    linkChangeHandler = (event, link) => {
        let eventId = link
        this.props.fetchEvent(eventId)
        document.querySelector(".SearchInput__input").value = ""
        this.props.hideSearchDropdown()
    }

    onFocusSearchHandler = (event) => {
        let searchRequest = event.target.value
        if (searchRequest.trim().length > 0) {
            this.props.showSearchDropdown()
        } else {
            this.props.hideSearchDropdown()
        }
    }

    onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
            this.props.history.push(`/search/?q=${this.props.searchRequest}`)
            this.props.hideSearchDropdown()
        }
    }

    onBlurSearchHandler = () => {
        this.props.hideSearchDropdown()
    }

    render() {
        return (
            <div className="Header">
                <div className="Header__container">
                    <Link className="Header__logo" to="/">Афиша</Link>
                    <div className="Header__search">
                        <SearchInput
                            searchRequest={this.props.searchRequest}
                            onClick={this.searchHandler}
                            onChange={this.changeHandler}
                            onFocus={this.onFocusSearchHandler}
                            onBlur={this.onBlurSearchHandler}
                            onKeyDown={this.onKeyDownHandler}
                            isEmpty={this.props.searchRequest !== "" ? false : true} 
                        />
                        {
                            this.props.searchResultData.length > 0 && 
                            this.props.isShowSearchDropdown && 
                            this.props.searchRequest.length > 0
                                ? <div className="container--search-results">
                                    {this.props.loading ? <Loader /> : this.renderSearchResults()}
                                  </div>
                                : null
                        }
                    </div>
                    <Link className={`Header__link ${this.props.isFill ? "Header__link--active" : ""}`} to="/favorites">
                        {
                            this.props.isFill
                                ? <span className="Header__link--favorites">{this.props.favoritesCount}</span>
                                : null
                        }
                        Избранное
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        favoritesData: state.favorites.favoritesData,
        searchResultData: state.search.searchResultData,
        searchRequest: state.search.searchRequest,
        isShowSearchDropdown: state.search.isShowSearchDropdown,
        loading: state.search.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSearchResult: (searchRequest) => dispatch(fetchSearchResult(searchRequest)),
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
        clearSearchResult: () => dispatch(clearSearchResult()),
        fetchSearchRequest: (searchRequest) => dispatch(fetchSearchRequest(searchRequest)),
        showSearchDropdown: () => dispatch(showSearchDropdown()),
        hideSearchDropdown: () => dispatch(hideSearchDropdown()),
        fetchEmptySearch: () => dispatch(fetchEmptySearch())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
