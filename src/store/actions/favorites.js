import { 
    FETCH_FAVORITES_SUCCESS, 
    ADD_FAVORITES_SUCCESS, 
    REMOVE_FAVORITES_SUCCESS 
} from "./actionTypes"

export function fetchFavorites() {
    return async dispatch => {
        dispatch(fetchFavoritesSuccess())
    }
}

export function fetchFavoritesSuccess() {
    return {
        type: FETCH_FAVORITES_SUCCESS,
    }
}

export function addFavorites(likeParam) {
    return async (dispatch, getState) => {
        const afficheData = getState().affiche.afficheData
        let like
        afficheData.forEach((item) => {
            if (item.link === likeParam) {
                item.isLiked = true
                like = item
            }
        })

        const searchResultData = getState().search.searchResultData
        searchResultData.forEach((item) => {
            if (item.link === likeParam) {
                item.isLiked = true
                like = item
            }
        })
        const favoritesData = [...getState().favorites.favoritesData, like]
        dispatch(addFavoritesSuccess(favoritesData, afficheData, searchResultData))
    }
}

export function addFavoritesSuccess(favoritesData, afficheData, searchResultData) {
    return {
        type: ADD_FAVORITES_SUCCESS,
        favoritesData: favoritesData,
        afficheData: afficheData,
        searchResultData: searchResultData
    }
}

export function removeFavorites(likeParam) {
    return async (dispatch, getState) => {
        const afficheData = getState().affiche.afficheData
        afficheData.forEach((item) => {
            if (item.link === likeParam) {
                item.isLiked = false
            }
        })

        const searchResultData = getState().search.searchResultData
        searchResultData.forEach((item) => {
            if (item.link === likeParam) {
                item.isLiked = false
            }
        })

        const favoritesData = [...getState().favorites.favoritesData]
        favoritesData.forEach((event, index) => {
            if (event.link === likeParam) {
                favoritesData.splice(index, 1)
            }
        })
        dispatch(removeFavoritesSuccess(favoritesData, afficheData, searchResultData))
    }
}

export function removeFavoritesSuccess(favoritesData, afficheData, searchResultData) {
    return {
        type: REMOVE_FAVORITES_SUCCESS,
        favoritesData: favoritesData,
        afficheData: afficheData,
        searchResultData: searchResultData
    }
}