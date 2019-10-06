import {
    FETCH_CURRENT_RESULTS,
    FETCH_RESULT,
    SET_SINGLE_RESULT
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT_RESULTS:
            return {
                ...state,
                currentSeason: action.payload.season,
                currentResults: action.payload.Races
            }
        case FETCH_RESULT:
            return {
                ...state,
                singleResult: action.payload
            }
        case SET_SINGLE_RESULT:
            return {
                ...state,
                query: {
                    season: action.payload.season,
                    round: action.payload.round
                }
            }
        default:
            return state
    }
}