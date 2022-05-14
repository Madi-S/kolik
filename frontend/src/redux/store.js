import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { postReducer } from './reducers/post'
import { searchReducer } from './reducers/search'
import { settingsReducer } from './reducers/settings'

const rootReducer = combineReducers({
    post: postReducer,
    search: searchReducer,
    settings: settingsReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
