import { combineReducers } from 'redux';
import auth from './auth'
import store from './store'
export default combineReducers({auth, store});