import {
    FETCH_AFFICHE_SUCCESS,
    CHANGE_SORT_BY_PRICE_SUCCESS,
    FILTER_DATA_SUCCESS
} from "../actions/actionTypes"

const initialState = {
    afficheData: [],
    isAscendingPrice: true,
    activeTab: "",
    loading: true
}

export default function afficheReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AFFICHE_SUCCESS:
            return {
                ...state,
                afficheData: action.afficheData,
                isAscendingPrice: action.isAscendingPrice,
                activeTab: action.activeTab,
                loading: action.loading
            }
        case CHANGE_SORT_BY_PRICE_SUCCESS:
            return {
                ...state,
                afficheData: action.afficheData,
                isAscendingPrice: action.isAscendingPrice,
            }
        case FILTER_DATA_SUCCESS:
            return {
                ...state,
                afficheData: action.afficheData,
                activeTab: action.activeTab,
                isAscendingPrice: action.isAscendingPrice,
                loading: action.loading,
            }
        default:
            return state
    }
}