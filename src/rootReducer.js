<<<<<<< HEAD
import { combineReducers } from 'redux';

import user from './reducers/user';

export default combineReducers({
    user:  () => ({})
})
=======
import { combineReducers } from "redux";
	
import user from './reducers/user';
import events from './reducers/events';
import books from './reducers/books.js';

export default combineReducers({
	user,
	events,
	books,
});
>>>>>>> HEAD@{4}
