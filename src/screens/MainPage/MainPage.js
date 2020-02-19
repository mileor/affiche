import React from "react"
import HeaderRender from "../../components/Header/HeaderRender"
import TabButton from "../../components/TabButton/TabButton"
import Select from "../../components/Select/Select"
import EventCard from "../../components/EventCard/EventCard"
import Loader from "../../components/Loader/Loader"
import { connect } from "react-redux"
import { fetchAffiche, changeSortByPrice, filterData } from "../../store/actions/affiche"
import { addFavorites, removeFavorites } from "../../store/actions/favorites"

class MainPage extends React.Component {

    componentDidMount() {
        const filterId = this.props.match.params.id
        this.props.fetchAffiche(filterId)
    }

    renderEvents = () => {
        return this.props.afficheData.map((event, index) => {
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
                    isLiked={event.isLiked} 
                />
            )
        })
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

    sortByPriceHandler = () => {
        this.props.changeSortByPrice()
    }

    filterHandler = (event) => {
        const filterParam = event.target.id
        this.props.filterData(filterParam)
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <HeaderRender />
                    <h1>Ближайшие события в городе</h1>
                    <div className="container--filters">
                        <TabButton 
                            isSelected={this.props.activeTab === "all"} 
                            name="Все" 
                            id="all" 
                            onClick={this.filterHandler}>
                        </TabButton>
                        <TabButton 
                            isSelected={this.props.activeTab === "movies"} 
                            name="Кино" 
                            id="movies" 
                            onClick={this.filterHandler}>
                        </TabButton>
                        <TabButton 
                            isSelected={this.props.activeTab === "exposition"} 
                            name="Выставки" id="exposition" 
                            onClick={this.filterHandler}>
                        </TabButton>
                        <TabButton 
                            isSelected={this.props.activeTab === "theater"} 
                            name="Театр" 
                            id="theater" 
                            onClick={this.filterHandler}>
                        </TabButton>
                        <TabButton 
                            isSelected={this.props.activeTab === "festival"} 
                            name="Фестивали" 
                            id="festival" 
                            onClick={this.filterHandler}>
                        </TabButton>
                        <TabButton 
                            isSelected={this.props.activeTab === "education"} 
                            name="Обучение" 
                            id="education" 
                            onClick={this.filterHandler}>
                        </TabButton>
                        <Select
                            isAscendingPrice={this.props.isAscendingPrice}
                            onClick={this.sortByPriceHandler}
                        />
                    </div>
                    <div className="container--cards">
                        {
                            this.props.loading
                                ? <Loader />
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
        afficheData: state.affiche.afficheData,
        isAscendingPrice: state.affiche.isAscendingPrice,
        favoritesData: state.favorites.favoritesData,
        activeTab: state.affiche.activeTab,
        loading: state.affiche.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAffiche: (filterId) => dispatch(fetchAffiche(filterId)),
        changeSortByPrice: () => dispatch(changeSortByPrice()),
        filterData: (filterParam) => dispatch(filterData(filterParam)),
        addFavorites: (likeParam) => dispatch(addFavorites(likeParam)),
        removeFavorites: (likeParam) => dispatch(removeFavorites(likeParam)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)