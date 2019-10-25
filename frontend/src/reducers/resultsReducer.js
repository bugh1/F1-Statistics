import {
    FETCH_CURRENT_RESULTS,
    FETCH_RESULT,
    FETCH_QUALIFYING_RESULT,
    FETCH_QUALIFYING_RESULTS
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
        case FETCH_QUALIFYING_RESULT:
            return {
                ...state,
                singleQualifyingResult: action.payload
            }
        case FETCH_QUALIFYING_RESULTS:
            return {
                ...state,
                qualifyingResults: action.payload
            }
        default:
            return state
    }
}