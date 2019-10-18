import api from '../api';


export const newbook = data => () =>
    api.book.newbook(data);

export const fetchEvents = () => () =>
    api.book.fetchEvents();

