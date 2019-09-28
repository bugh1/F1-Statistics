import {
    FETCH_CURRENT_RESULTS
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