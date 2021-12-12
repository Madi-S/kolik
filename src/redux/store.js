import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { postReducer } from './reducers/post'

const rootReducer = combineReducers({
    post: postReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
