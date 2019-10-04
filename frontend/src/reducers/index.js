import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import resultsReducer from './resultsReducer'

export default combineReducers({
    form: formReducer,
    results: resultsReducer
})