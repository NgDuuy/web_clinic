import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import _ from 'lodash';
import { getProfileDoctorById } from '../../../services/userService';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import localization from 'moment/locale/vi';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data
            })
        }
    }
    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            let data = res.data;
            if (data && data.errCode === 0) {
                result = data.data
            }
        }
        return result;
    }
    renderTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let date = (language === LANGUAGE.VI)
                ? moment.unix(+dataScheduleTimeModal.date / 1000).locale('vi').format('dddd - DD/MM/YYYY')
                : moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            let time = (language === LANGUAGE.VI) ? dataScheduleTimeModal.timeTypeData.valueVi :
                dataScheduleTimeModal.timeTypeData.valueEn;
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.freeBooking' /></div>
                </>
            )
        }
        return <></>
    }
    render() {

        let { language, isShowDescriptionDoctor, dataScheduleTimeModal } = this.props
        let { dataProfile } = this.state;
        let nameEn = "", nameVi = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='title-doctor'>
                            {language === LANGUAGE.VI ? nameVi : nameEn}
                        </div>
                        <div className='content-doctor'>
                            {isShowDescriptionDoctor === true ?
                                (<>
                                    {dataProfile
                                        && dataProfile.Markdown
                                        && dataProfile.Markdown.description
                                        &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>)
                                :
                                (<>
                                    {this.renderTimeBooking(dataScheduleTimeModal)}
                                </>)
                            }
                        </div>
                    </div>

                </div>
                <div className='price'>
                    <FormattedMessage id='patient.booking-modal.price' />
                    {dataProfile && dataProfile.doctor_Infor && language === LANGUAGE.VI
                        ?

                        <NumericFormat
                            className='currentcy'
                            value={
                                language === LANGUAGE.VI
                                    ? Number(dataProfile.doctor_Infor.priceTypeData.valueVi)
                                    : ""
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={language === LANGUAGE.VI ? 'VND' : '$'}
                        /> : ''}
                    {dataProfile && dataProfile.doctor_Infor && language === LANGUAGE.EN
                        ?
                        <NumericFormat
                            className='currentcy'
                            value={
                                language === LANGUAGE.EN
                                    ? Number(dataProfile.doctor_Infor.priceTypeData.valueEn)
                                    : ""
                            }
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={language === LANGUAGE.EN ? '$' : 'VND'}
                        />

                        : ''}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
