import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss'
import { LANGUAGE } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    getArrayDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let Object = {};
            if (language === LANGUAGE.VI) {
                if (i === 0) {
                    let labelVi = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${labelVi}`;
                    Object.label = today

                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    Object.label = this.capitalizeFirstLetter(labelVi)
                }
            }
            else {
                if (i === 0) {
                    let labelEn = moment(new Date()).format('DD/MM')
                    let today = `Today - ${labelEn}`;
                    Object.label = today
                } else {
                    Object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }

            }
            Object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(Object);
        }
        return arrDate;
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrayDays(language)
        if (allDays && allDays.length > 0) {

            this.setState({
                allDays: allDays,
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrayDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParennt !== prevProps.doctorIdFromParennt) {
            let allDays = this.getArrayDays(this.props.language)
            let res = await getScheduleById(this.props.doctorIdFromParennt, allDays[0].value)
            this.setState({
                allAvailableTime: res.data.data ? res.data.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParennt && this.props.doctorIdFromParennt !== -1) {
            let doctorId = this.props.doctorIdFromParennt
            let date = event.target.value;
            let res = await getScheduleById(doctorId, date);
            if (res && res.data.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data.data
                })
            } else {
                this.setState({
                    allAvailableTime: []
                })
            }
        }
    }
    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (<option key={item.value} value={item.value}>{item.label}</option>)
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'> <span><FormattedMessage id='patient.detail-doctor.schedule' /></span> </i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            <>
                                <div className='time-content-btn'>
                                    {allAvailableTime.map((item, index) => {
                                        return (
                                            <button key={index}
                                                className={language === LANGUAGE.VI ? "btn-Vi" : "btn-En"}
                                            >{language === LANGUAGE.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}

                                            </button>
                                        )
                                    })}
                                </div>
                                <div className='book-free'>
                                    <span><FormattedMessage id='patient.detail-doctor.choose' />
                                        <i className='far fa-hand-point-up'></i>
                                        <FormattedMessage id='patient.detail-doctor.book-free' />
                                    </span>
                                </div>
                            </>
                            :
                            (
                                <div className='no-schedule'>
                                    <FormattedMessage id='patient.detail-doctor.no-schedule' />
                                </div>
                            )
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
