import {
    FETCH_CURRENT_RESULTS
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT_RESULTS:
            return {
                ...state,
                currentSeason: action.payload.season,
                currentResults: action.payload.Races
            }
        default:
            return state
    }
}