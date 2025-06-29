import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class OutstandingDoctor extends Component {

    render() {
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sỹ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Hà Văn Quyết1</div>
                                        <div>Tiêu hóa, bênh viêm gangan</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Hà Văn Quyết2</div>
                                        <div>Tiêu hóa, bênh viêm gangan</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Hà Văn Quyết3</div>
                                        <div>Tiêu hóa, bênh viêm gangan</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Hà Văn Quyết4</div>
                                        <div>Tiêu hóa, bênh viêm gangan</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Hà Văn Quyết5</div>
                                        <div>Tiêu hóa, bênh viêm gangan</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Hà Văn Quyết6</div>
                                        <div>Tiêu hóa, bênh viêm gangan</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
