import axios from "axios"
import { 
    FETCH_SEARCH_RESULT_SUCCESS, 
    CLEAR_SEARCH_RESULT_SUCCESS, 
    FETCH_SEARCH_REQUEST_SUCCESS, 
    SHOW_SEARCH_DROPDOWN_SUCCESS, 
    HIDE_SEARCH_DROPDOWN_SUCCESS, 
    FETCH_EMPTY_SEARCH_SUCCESS 
} from "./actionTypes"

export function fetchSearchResult(searchRequest) {
    return async (dispatch, getState) => {
        axios.get("https://affiche-fdb34.firebaseio.com/afficheData.json")
            .then((response) => {
                const afficheData = Object.values(response.data)

                const searchResultData = afficheData.filter((item) => {
                    const searchRequestLowerCase = searchRequest.toLowerCase()
                    return item.body.toLowerCase().includes(searchRequestLowerCase)
                        || item.title.toLowerCase().includes(searchRequestLowerCase)
                        || item.description.toLowerCase().includes(searchRequestLowerCase)
                })
              
                const favoritesData = getState().favorites.favoritesData
                searchResultData.forEach((event) => {
                    if (favoritesData.find(element => element.link === event.link)) {
                        event.isLiked = true
                    } else {
                        event.isLiked = false
                    }
                })

                dispatch(fetchSearchResultSuccess(searchResultData, searchRequest))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function fetchSearchResultSuccess(searchResultData, searchRequest) {
    return {
        type: FETCH_SEARCH_RESULT_SUCCESS,
        searchResultData: searchResultData,
        searchRequest: searchRequest,
        loading: false,
        isSearchEmpty: false
    }
}

export function fetchEmptySearch() {
    return async dispatch => {
        dispatch(fetchEmptySearchSuccess())
    }
}

export function fetchEmptySearchSuccess() {
    return {
        type: FETCH_EMPTY_SEARCH_SUCCESS,
        isSearchEmpty: true
    }
}

export function clearSearchResult() {
    return async dispatch => {
        dispatch(clearSearchResultSuccess())
    }
}

export function clearSearchResultSuccess() {
    return {
        type: CLEAR_SEARCH_RESULT_SUCCESS,
        searchResultData: [],
        loading: true,
        searchRequest: "",
    }
}

export function fetchSearchRequest(searchRequest) {
    return async dispatch => {
        dispatch(fetchSearchRequestSuccess(searchRequest))
    }
}

export function fetchSearchRequestSuccess(searchRequest) {
    return {
        type: FETCH_SEARCH_REQUEST_SUCCESS,
        searchRequest: searchRequest,
        isSearchEmpty: false
    }
}

export function showSearchDropdown() {
    return async dispatch => {
        dispatch(showSearchDropdownSuccess())
    }
}

export function showSearchDropdownSuccess() {
    return {
        type: SHOW_SEARCH_DROPDOWN_SUCCESS,
        isShowSearchDropdown: true
    }
}

export function hideSearchDropdown() {
    return async dispatch => {
        dispatch(hideSearchDropdownSuccess())
    }
}

export function hideSearchDropdownSuccess() {
    return {
        type: HIDE_SEARCH_DROPDOWN_SUCCESS,
        isShowSearchDropdown: false
    }
}