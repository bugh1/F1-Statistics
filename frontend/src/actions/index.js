import {
    FETCH_CURRENT_RESULTS,
    FETCH_RESULT,
    FETCH_QUALIFYING_RESULT
} from './types'
import axios from 'axios'

export const fetchCurrentResults = () => {
    return async (dispatch) => {
        console.log('fetching')
        const response = await axios.get('/api/current/results')

        dispatch({
            type: FETCH_CURRENT_RESULTS,
            payload: response.data
        })
    }
}

export const fetchResult = (season, round) => {
    return async (dispatch) => {
        console.log("fetching")
        const response = await axios.get(`/api/results/${season}/${round}`)

        dispatch({
            type: FETCH_RESULT,
            payload: response.data
        })
    }
}

export const fetchQualifyingResult = (season, round) => {
    return async (dispatch) => {
        console.log("fetching qualifying result")
        const response = await axios.get(`/api/qualifying/${season}/${round}`)

        dispatch({
            type: FETCH_QUALIFYING_RESULT,
            payload: response.data
        })
    }
}