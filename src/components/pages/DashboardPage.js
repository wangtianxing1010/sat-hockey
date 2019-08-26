import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allEventsSelector } from '../../reducers/events';
import { allBooksSelector } from '../../reducers/books.js';
import AddBookCta from '../ctas/AddBookCta';

class DashboardPage extends React.Component{
    render(){
        const { isConfirmed, events, books } = this.props;
        return(
            <div>
                { !isConfirmed && <ConfirmEmailMessage />}
                { events.length ===0 && <AddBookCta /> }
            </div>
        )
    }
}

// const DashboardPage = ({ isConfirmed }) =>(
//     <div>
//         { !isConfirmed && <ConfirmEmailMessage />}
//     </div>
// );

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};

function mapStateToProps(state){
    return{
        isConfirmed: !!state.user.confirmed,
        events: allEventsSelector(state),
        books: allBooksSelector(state),
    }
}

export default connect(mapStateToProps)(DashboardPage);