import api from '../api';

export const newEvent = data => () => 
    api.event.newEvent(data);
