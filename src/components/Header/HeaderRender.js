import React from "react"
import Header from "./Header"
import "./Header.scss"
import { connect } from "react-redux"

class HeaderRender extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header
                    isFill={this.props.favoritesData.length > 0 ? true : false}
                    favoritesCount={this.props.favoritesData.length}>
                </Header>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        favoritesData: state.favorites.favoritesData,
    }
}

export default connect(mapStateToProps)(HeaderRender)
