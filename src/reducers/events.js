import { createSelector } from 'reselect';
import { EVENTS_FETCHED_SUCCESS } from '../types'


export default function events(state={}, action={}) {
    switch(action.type){
        case EVENTS_FETCHED_SUCCESS:
            return action.events;
        default: 
            return state;
    }
}

export const eventsSelector = state => state.events;

export const allEventsSelector = createSelector(
    eventsSelector,
    eventHash => Object.values(eventHash) // returns an array of event objects
    //  eventHash {
        // 111: {},
        // 222: {}
    // }
    // becomes ==>
    // Object.values(eventHash) :[{},{}]
)
