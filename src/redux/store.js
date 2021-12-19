import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { postReducer } from './reducers/post'
import { searchRedcuer } from './reducers/search'

const rootReducer = combineReducers({
    post: postReducer,
    seach: searchRedcuer
})

export default createStore(rootReducer, applyMiddleware(thunk))
