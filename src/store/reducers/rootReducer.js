import { combineReducers } from "redux"
import afficheReducer from "./affiche"
import favoritesReducer from "./favorites"
import eventReducer from "./event"
import searchReducer from "./search"

export default combineReducers({
    affiche: afficheReducer,
    favorites: favoritesReducer,
    event: eventReducer,
    search: searchReducer
})