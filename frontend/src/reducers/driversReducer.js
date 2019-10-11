import {
    FETCH_DRIVERS
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DRIVERS:
            return {
                currentDrivers: action.payload.Drivers
            }
        default:
            return state
    }
}