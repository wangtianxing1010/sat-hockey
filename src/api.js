import axios from 'axios';

export default {
    user: {
        // define param name here
        login: credentials => 
            axios.post('/api/auth', {credentials}).then(res => res.data.user), 
        signup: user => 
            axios.post('/api/users', {user}).then(res =>res.data.user),
        confirm: token => 
            axios.post('/api/auth/confirmation/', {token}).then(res =>res.data.user),
    }
};