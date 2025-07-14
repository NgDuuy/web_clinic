import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils/constant';
import { withRouter } from 'react-router';
class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }
    handleViewDetailDoctor = (data) => {
        console.log("Data in handleViewDetailDoctor: ", data)
        this.props.history.push(`/detail-doctor/${data.id}`)
    }
    render() {
        let allDoctor = this.state.arrDoctor;
        let { language } = this.props
        console.log('Check top doctor: ', allDoctor)
        return (
            <div className='section-share section-outstanding-doctor '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-page.outStandingDoctor' /></span>
                        <button className='btn-section'><FormattedMessage id='home-page.more-info' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {allDoctor && allDoctor.length > 0 &&
                                allDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)} >
                                            <div className='customize-border'>
                                                <div className='outer-background'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                                                    <div>Tiêu hóa, bênh viêm gangan</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchAllDoctorTop())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
