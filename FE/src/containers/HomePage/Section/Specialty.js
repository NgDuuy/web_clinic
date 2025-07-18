import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// import "slick-carousel/slick/slick-theme.css"
class Specailty extends Component {
    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cộng hưởng từ1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cộng hưởng từ2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cộng hưởng từ3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cộng hưởng từ4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty' />
                                <div>Cộng hưởng từ5</div>
                            </div>
                        </Slider>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specailty);
