import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManageSchedule.scss";
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGE, dateFormat } from '../../../utils/constant';
import { getDetailInforService, postBulkCreateSchedule } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllCodeScheduleHoursRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let dataSelect = this.props.allScheduleTime
            if (dataSelect && dataSelect.length > 0) {
                dataSelect = dataSelect.map(item => {
                    item.isSelected = false
                    return item
                })
            }
            console.log("Check data select: ", dataSelect)
            this.setState({
                rangeTime: dataSelect
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object);
            })
        }
        return result;
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })

    }
    handleSelected = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            let updateRangeTime = rangeTime.map((item, index) => {
                if (item.id === time.id) {
                    return {
                        ...item,
                        isSelected: !item.isSelected
                    };
                }
                return item;
            })
            this.setState({
                rangeTime: updateRangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        const { isLoggedIn, language } = this.props
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        console.log("Range time: ", rangeTime)
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid doctor!")
            return;
        }
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }
        // let formatedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let Object = {};
                    Object.doctorId = selectedDoctor.value;
                    Object.date = formatedDate;
                    Object.timeType = item.keyMap;
                    result.push(Object)
                })
            }
            else {
                toast.error("Need to choose time")
                return;
            }
        }
        console.log("Check result: ", result)
        let post = await postBulkCreateSchedule(result);
        if (post.data.errCode === 0) {
            toast.success(post.data.message)
        }
        if (post.data.errCode === -1) {
            toast.error(post.data.errMessage)
        }
        console.log("Check result", post);
    }
    render() {
        const { selectedDoctor, rangeTime } = this.state;
        const { isLoggedIn, language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className="manage-schedule-container">
                <div className='manage-schedule-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => this.handleSelected(item)}
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                        >
                                            {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary col-2 btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save" /></button>
                        </div>


                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllCodeScheduleHoursRedux: () => dispatch(actions.fetchAllCodeScheduleHours()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
