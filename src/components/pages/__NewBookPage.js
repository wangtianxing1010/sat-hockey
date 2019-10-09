import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import NewBookForm from '../forms/__NewBookForm';

import { newbook } from '../../actions/book';

class NewBookPage extends React.Component{
    state = {
        book: null,
    };

    submit = (data) => 
        this.props.newbook(data);

    render(){
        return (
            <Segment padded>
                <h1>Post a new book</h1>
                <NewBookForm submit={this.submit}/>
            </Segment>
        );
    }
}

NewBookPage.propTypes = {
    newbook: PropTypes.func.isRequired,
}

export default connect(null, {newbook})(NewBookPage);