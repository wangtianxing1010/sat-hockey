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
        
        resetPasswordRequest: data => 
            axios.post('/api/auth/reset_password_request/', {data})
            .then(res =>res.data.msg)
            ,
        validateResetPasswordToken: token => 
            axios.post('/api/auth/validate_reset_password_token/', {token})
            ,
        resetPassword: data =>
            axios.post('/api/auth/reset_password/', {data}), 
    } ,
    event: {
        newEvent: event =>
            axios.post('/api/books', {event}).then(res=>res.data.event)
        ,
        fetchEvents: organizer =>
            axios.get('/api/books', {organizer}).then(res=>res.data.events)
    }
};