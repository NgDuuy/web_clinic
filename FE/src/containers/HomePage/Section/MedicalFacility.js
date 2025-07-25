import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Việt Đức1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Việt Đức2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Việt Đức3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Việt Đức4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Việt Đức5</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
