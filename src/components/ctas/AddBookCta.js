import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AddEventCta = ()=>(
    <Card centered>
        <Card.Content textAlign='center'>
            <Card.Header>Add new Event</Card.Header>
            {/* change url */}
            <Link to='/books/new'>
                <Icon name='plus circle' size='massive' />
            </Link>
        </Card.Content>
    </Card>
);

export default AddEventCta;