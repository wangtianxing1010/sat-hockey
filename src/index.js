import React from 'react';
import ReactDOM from 'react-dom';
// react router
import { BrowserRouter } from 'react-router-dom';
// semantic ui
import 'semantic-ui-css/semantic.min.css';
// redux and thunk
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// app
import App from './App';
import * as serviceWorker from './serviceWorker';

import rootReducer from './rootReducer';
import {userLoggedIn} from './actions/auth';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import decode from 'jwt-decode';

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)

if(localStorage.sat_hockeyJWT){
    const payload = decode(localStorage.sat_hockeyJWT);
    const user = { 
        token: localStorage.sat_hockeyJWT,
        email: payload.email,
        confirmed: payload.confirmed,
     };
    setAuthorizationHeader(localStorage.sat_hockeyJWT);
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
