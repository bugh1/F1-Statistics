import {
    FETCH_CURRENT_RESULTS,
    FETCH_RESULT
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