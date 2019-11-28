import { EVENTS_FETCHED_SUCCESS } from '../types';
import api from '../api';

export const eventsFetchedSuccess = events => ({
    type: EVENTS_FETCHED_SUCCESS,
    events
});

export const newEvent = data => () => 
    api.event.newEvent(data);

export const fetchEvents = organizer => dispatch =>
    api.event.fetchEvents(organizer).then(events=>{
        // save events data inside store
        dispatch(eventsFetchedSuccess(events));
        // fetch all events from home page -- no args
        // fetch all events of an organizer from dashboard -- logged in, arg: hosted
        // fetch all events of a participant from dashboard page -- logged in, arg: participated
    });

export const enrollEvent = () => {
    // post user info to database, get returned value of new list of participants
}
