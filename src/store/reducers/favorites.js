import { 
    FETCH_FAVORITES_SUCCESS, 
    ADD_FAVORITES_SUCCESS, 
    REMOVE_FAVORITES_SUCCESS 
} from "../actions/actionTypes"

const initialState = {
    favoritesData: [],
}

export default function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
            }
        case ADD_FAVORITES_SUCCESS:
            return {
                ...state,
                afficheData: action.afficheData,
                favoritesData: action.favoritesData,
                searchResultData: action.searchResultData
            }
        case REMOVE_FAVORITES_SUCCESS:
            return {
                ...state,
                afficheData: action.afficheData,
                favoritesData: action.favoritesData,
                searchResultData: action.searchResultData
            }
        default:
            return state
    }
}