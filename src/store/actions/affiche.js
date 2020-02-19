import axios from "axios"
import {
    FETCH_AFFICHE_SUCCESS, 
    CHANGE_SORT_BY_PRICE_SUCCESS, 
    FILTER_DATA_SUCCESS 
} 
from "./actionTypes"

export function fetchAffiche(filterId) {
    return async (dispatch, getState) => {
        if (filterId === "all") {
            axios.get("https://affiche-fdb34.firebaseio.com/afficheData.json")
                .then((response) => {
                    const afficheData = Object.values(response.data)
                    const favoritesData = getState().favorites.favoritesData
                    
                    afficheData.forEach((item) => {
                        if (favoritesData.find(element => element.link === item.link)) {
                            item.isLiked = true
                        } else {
                            item.isLiked = false
                        }
                    })

                    const isAscendingPrice = getState().affiche.isAscendingPrice
                    if (isAscendingPrice) {
                        afficheData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    } else {
                        afficheData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                    }

                    const activeTab = "all"
                    dispatch(fetchAfficheSuccess(isAscendingPrice, afficheData, activeTab))
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.get(`https://affiche-fdb34.firebaseio.com/afficheData.json?orderBy="category"&equalTo="${filterId}"`)
                .then((response) => {
                    const afficheFilteredData = Object.values(response.data)
                    const favoritesData = getState().favorites.favoritesData
                    afficheFilteredData.forEach((item) => {
                        if (favoritesData.find(element => element.link === item.link)) {
                            item.isLiked = true
                        } else {
                            item.isLiked = false
                        }
                    })

                    const isAscendingPrice = getState().affiche.isAscendingPrice
                    if (isAscendingPrice) {
                        afficheFilteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    } else {
                        afficheFilteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                    }

                    const activeTab = filterId

                    dispatch(filterDataSuccess(afficheFilteredData, activeTab, isAscendingPrice))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export function fetchAfficheSuccess(isAscendingPrice, afficheData, activeTab) {
    return {
        type: FETCH_AFFICHE_SUCCESS,
        afficheData: afficheData,
        isAscendingPrice: isAscendingPrice,
        activeTab: activeTab,
        loading: false
    }
}

export function changeSortByPrice() {
    return async (dispatch, getState) => {
        const isAscendingPrice = !getState().affiche.isAscendingPrice
        let afficheData = getState().affiche.afficheData

        if (isAscendingPrice) {
            afficheData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        } else {
            afficheData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        }

        dispatch(changeSortByPriceSuccess(isAscendingPrice, afficheData))
    }
}

export function changeSortByPriceSuccess(isAscendingPrice, afficheData) {
    return {
        type: CHANGE_SORT_BY_PRICE_SUCCESS,
        afficheData: afficheData,
        isAscendingPrice: isAscendingPrice,
    }
}

export function filterData(filterParam) {
    return async (dispatch, getState) => {
        if (filterParam === "all") {
            dispatch(fetchAffiche(filterParam))
        } else {
            axios.get(`https://affiche-fdb34.firebaseio.com/afficheData.json?orderBy="category"&equalTo="${filterParam}"`)
                .then((response) => {
                    const afficheFilteredData = Object.values(response.data)
                    const favoritesData = getState().favorites.favoritesData

                    afficheFilteredData.forEach((item) => {
                        if (favoritesData.find(element => element.link === item.link)) {
                            item.isLiked = true
                        } else {
                            item.isLiked = false
                        }
                    })

                    const isAscendingPrice = getState().affiche.isAscendingPrice

                    if (isAscendingPrice) {
                        afficheFilteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    } else {
                        afficheFilteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                    }

                    const activeTab = filterParam

                    dispatch(filterDataSuccess(afficheFilteredData, activeTab, isAscendingPrice))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

export function filterDataSuccess(afficheFilteredData, activeTab, isAscendingPrice) {
    return {
        type: FILTER_DATA_SUCCESS,
        afficheData: afficheFilteredData,
        activeTab: activeTab,
        isAscendingPrice: isAscendingPrice,
        loading: false
    }
}