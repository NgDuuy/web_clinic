import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// import "slick-carousel/slick/slick-theme.css"
class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2025 Duc Duy. More information about me. <a target='_blank' href='https://www.facebook.com/'>&#8594; Click here &#8592;</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
