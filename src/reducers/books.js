import { createSelector } from 'reselect';

export default function books(state={}, action={}){
    switch(action.type){
        default: return state;
    }
}

export const booksSelector = state => state.books; // returns the bookhash in the reducer

export const allBooksSelector = createSelector(
    booksSelector,
    bookHash => Object.values(bookHash)
)
