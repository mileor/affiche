import { FETCH_EVENT_SUCCESS } from "../actions/actionTypes"

const initialState = {
    eventData: {}
}

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENT_SUCCESS:
            return {
                eventData: action.eventData,
            }
        default:
            return state
    }
}