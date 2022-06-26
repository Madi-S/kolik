import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { postReducer } from './reducers/post'
import { searchReducer } from './reducers/search'
import { settingsReducer } from './reducers/settings'

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const postPersistConfig = {
    key: 'post',
    storage: AsyncStorage
}

const settingsPersistConfig = {
    key: 'settings',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    search: searchReducer,
    post: persistReducer(postPersistConfig, postReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer)
})

const persistsRootReducer = (rootPersistConfig, rootReducer)

export const store = createStore(persistsRootReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
