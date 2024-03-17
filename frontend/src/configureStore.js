import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, compose, applyMiddleware } from 'redux'

import { sagaWatcher } from './redux/sagas'
import rootReducer from './redux/rootReducer'
import { validatePhoneInput } from './redux/middleware'

// --- DEV TOOLS ---
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// --- SAGA ---
const saga = createSagaMiddleware()

// --- REDUX-PERSIST --- (Save to localStorage)
const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// --- CORE ---
export let store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk, saga))
)
export let persistor = persistStore(store)

// saga.run(sagaWatcher)

