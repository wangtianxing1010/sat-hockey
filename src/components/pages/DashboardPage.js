import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allEventsSelector } from '../../reducers/events';
// import { allBooksSelector } from '../../reducers/books.js';
import {fetchEvents} from '../../actions/eventActions';
import AddBookCta from '../ctas/AddBookCta';
import EventForm from '../forms/EventForm';

class DashboardPage extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: false,
        }
    }

    componentDidMount(){
        this.setState({loading: true});
        this.onInit();
    }

    onInit = () => {
        const props = this.props;
        props.fetchEvents({organizer: props.currentUser ? props.currentUser: null})
        .then(()=>this.setState({...this.state, loading: false}));
    }

    renderItems = (events) => {
        const {loading} = this.state;
        return <>
            <h2>All Events</h2>
            { events.map((event, i)=> <EventForm loading={loading} key={i} event={event} />) }
        </>
    }

    render(){
        const { isConfirmed } = this.props;
        return(
            <div>
                { !isConfirmed && <ConfirmEmailMessage />}
                <AddBookCta />
                { this.props.events instanceof(Array) && this.renderItems(this.props.events)}
            </div>
        )
    }
}

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    // events: PropTypes.arrayOf(PropTypes.shape({
    //     title: PropTypes.string.isRequired,
    //     organizer: PropTypes.shape({
    //         id:
    //     }).isRequired,
    // }).isRequired).isRequired,
};

function mapStateToProps(state){
    return{
        isConfirmed: !!state.user.confirmed,
        currentUser: state.user,
        events: allEventsSelector(state),
    }
}

export default connect(mapStateToProps, {fetchEvents})(DashboardPage);