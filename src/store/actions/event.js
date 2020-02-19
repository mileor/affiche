import axios from "axios"
import { FETCH_EVENT_SUCCESS } from "./actionTypes"

export function fetchEvent(eventId) {
    return async dispatch => {
        axios.get(`https://affiche-fdb34.firebaseio.com/afficheData.json?orderBy="link"&equalTo="${eventId}"`)
            .then((response) => {
                const eventData = Object.values(response.data)[0]
                dispatch(fetchEventSuccess(eventData))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function fetchEventSuccess(eventData) {
    return {
        type: FETCH_EVENT_SUCCESS,
        eventData: eventData,
    }
}
