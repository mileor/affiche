import {
    FETCH_SEARCH_RESULT_SUCCESS,
    CLEAR_SEARCH_RESULT_SUCCESS,
    FETCH_SEARCH_REQUEST_SUCCESS,
    SHOW_SEARCH_DROPDOWN_SUCCESS,
    HIDE_SEARCH_DROPDOWN_SUCCESS,
    FETCH_EMPTY_SEARCH_SUCCESS
} from "../actions/actionTypes"

const initialState = {
    searchResultData: [],
    searchRequest: "",
    isShowSearchDropdown: false,
    loading: true,
    isSearchEmpty: true
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchResultData: action.searchResultData,
                searchRequest: action.searchRequest,
                loading: action.loading,
                isSearchEmpty: action.isSearchEmpty
            }
        case FETCH_EMPTY_SEARCH_SUCCESS:
            return {
                ...state,
                isSearchEmpty: action.isSearchEmpty
            }
        case FETCH_SEARCH_REQUEST_SUCCESS:
            return {
                ...state,
                searchRequest: action.searchRequest,
                isSearchEmpty: action.isSearchEmpty
            }
        case SHOW_SEARCH_DROPDOWN_SUCCESS:
            return {
                ...state,
                isShowSearchDropdown: action.isShowSearchDropdown,
            }
        case HIDE_SEARCH_DROPDOWN_SUCCESS:
            return {
                ...state,
                isShowSearchDropdown: action.isShowSearchDropdown,
            }
        case CLEAR_SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchResultData: action.searchResultData,
                loading: action.loading,
                searchRequest: action.searchRequest,
            }
        default:
            return state
    }
}