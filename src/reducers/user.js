<<<<<<< HEAD
import {USER_LOGGED_IN} from '../types'
=======
import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../types'
>>>>>>> HEAD@{4}

export default function user(state={}, action={}){
    switch(action.type){
        case USER_LOGGED_IN:
            return action.user;
<<<<<<< HEAD
=======
        case USER_LOGGED_OUT:
            return {};
>>>>>>> HEAD@{4}
        default: return state;
    }
}