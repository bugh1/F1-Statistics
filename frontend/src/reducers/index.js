import { combineReducers } from 'redux'
import resultsReducer from './resultsReducer'

export default combineReducers({
    results: resultsReducer
})