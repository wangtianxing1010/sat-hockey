import React from 'react';
import { Segment } from 'semantic-ui-react';
import NewEventForm from '../forms/NewEventForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newEvent } from '../../actions/event';

class NewEventPage extends React.Component{
    state = {
        book: null,
    };

    submit = (data) =>
        this.props.newEvent(data).then(()=>this.history.push('/dashboard'));

    render(){
        return (
            <Segment padded>
                <h1>Post a new event</h1>
                <NewEventForm submit={this.submit}/>
            </Segment>
        );
    }
}

NewEventPage.propType = {
    newEvent: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    
}


export default connect(null, {newEvent})(NewEventPage);