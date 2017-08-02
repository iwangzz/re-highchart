import { combineReducers } from 'redux'
import nav from './nav'
import { routerReducer as routing } from 'react-router-redux'

export default combineReducers({
    nav,
    routing
})