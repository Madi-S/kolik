import { combineReducers } from 'redux'
import appReducer from './appReducer'
import loginReducer from './loginReducer'
import welcomeReducer from './welcomeReducer'

export default combineReducers({
    app: appReducer,
    login: loginReducer,
    welcome: welcomeReducer
})
