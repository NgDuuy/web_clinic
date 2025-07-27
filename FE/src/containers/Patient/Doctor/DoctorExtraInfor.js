import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss'
import { LANGUAGE } from '../../../utils';
import { getExtraDoctorByIdService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: ''
        }
    }


    async componentDidMount() {
        if (this.props.doctorIdFromParennt) {
            let res = await getExtraDoctorByIdService(this.props.doctorIdFromParennt);
            if (res && res.data && res.data.errCode === 0) {
                this.setState({
                    extraInfor: res.data.data
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapashot) {
        if (this.props.doctorIdFromParennt !== prevProps.doctorIdFromParennt) {
            let res = await getExtraDoctorByIdService(this.props.doctorIdFromParennt)
            let data = res.data
            if (data && data.errCode === 0) {
                this.setState({
                    extraInfor: data.data
                })
            }
        }
    }

    handleShowHide = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id='patient.extra-infor-doctor.addressClinic' /></div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false ? (
                        <div className='short-infor' >
                            <div className='price'> <FormattedMessage id='patient.extra-infor-doctor.price' />{
                                extraInfor && extraInfor.priceTypeData &&
                                <NumericFormat
                                    className='currentcy'
                                    value={
                                        language === LANGUAGE.VI
                                            ? Number(extraInfor.priceTypeData.valueVi)
                                            : Number(extraInfor.priceTypeData.valueEn)
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={language === LANGUAGE.VI ? 'VND' : '$'}
                                />
                            }
                                <span className='detail' onClick={() => this.handleShowHide(true)}>
                                    <FormattedMessage id='patient.extra-infor-doctor.detail' /></span></div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div>
                                    <FormattedMessage id='patient.extra-infor-doctor.price' />
                                </div>
                            </div>
                            <div className='title-price'><FormattedMessage id='patient.extra-infor-doctor.price' /> </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id='patient.extra-infor-doctor.price' /> </span>
                                    <span className='right'>{
                                        extraInfor && extraInfor.priceTypeData &&
                                        <NumericFormat
                                            value={
                                                language === LANGUAGE.VI
                                                    ? Number(extraInfor.priceTypeData.valueVi)
                                                    : Number(extraInfor.priceTypeData.valueEn)
                                            }
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={language === LANGUAGE.VI ? 'VND' : '$'}
                                        />
                                    }</span>
                                </div>
                                <div className='note'>{extraInfor && extraInfor && extraInfor.note ? extraInfor.note : ""}</div>
                            </div>
                            <div className='payment'><FormattedMessage id='patient.extra-infor-doctor.payment' /> {language === LANGUAGE.VI && extraInfor && extraInfor.paymentTypeData ? extraInfor?.paymentTypeData?.valueVi : extraInfor?.paymentTypeData?.valueEn}</div>
                            <div className='hide-price'>
                                <span onClick={() => this.handleShowHide(false)}><FormattedMessage id='patient.extra-infor-doctor.hide-price' /></span>
                            </div>
                        </div>
                    )}
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
