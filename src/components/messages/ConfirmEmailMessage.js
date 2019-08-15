import React from 'react';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ConfirmEmailMessage = () => (
    <Message info>
        <Message.Header>Please verify your email</Message.Header>
        <Link>Send another Confirmation Email</Link>
    </Message>    
); 

export default ConfirmEmailMessage;