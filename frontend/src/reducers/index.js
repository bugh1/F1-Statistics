import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import resultsReducer from './resultsReducer'
import driversReducer from './driversReducer'

export default combineReducers({
    form: formReducer,
    results: resultsReducer,
    drivers: driversReducer
})