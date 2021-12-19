import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { postReducer } from './reducers/post'
import { searchReducer } from './reducers/search'

const rootReducer = combineReducers({
    post: postReducer,
    search: searchReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
