import { createStore, applyMiddleware } from 'redux'
// import createLogger from 'redux-logger'
import rootReducer from '../reducers'

// const logger = createLogger()
// const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
// const createStoreWithMiddleware = applyMiddleware(logger)(createStore)

export default function configureStore(initialState) {
    // return createStoreWithMiddleware(rootReducer, initialState)
    return createStore(rootReducer, initialState)
}