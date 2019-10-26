import { EVENTS_FETCHED_SUCCESS } from '../types';
import api from '../api';

export const eventsFetchedSuccess = events => ({
    type: EVENTS_FETCHED_SUCCESS,
    events
});

export const newbook = data => () =>
    api.book.newbook(data);
    // export const newEvent = data => () => 
    // api.event.newEvent(data);

export const fetchEvents = () => dispatch =>
    api.book.fetchEvents().then(events=>{
        // save events data inside store
        dispatch(eventsFetchedSuccess(events));
    });

