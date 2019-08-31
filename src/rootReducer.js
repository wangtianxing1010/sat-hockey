import { combineReducers } from "redux";
	
import user from './reducers/user';
import events from './reducers/events';

export default combineReducers({
	user,
	events,
});