import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import { LANGUAGE } from '../../../../utils/constant';
import _, { times } from 'lodash';
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postBookAppointment } from '../../../../services/userService';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            email: '',
            dayOfBirth: '',
            reason: '',
            gender: '',
            doctorId: '',
            selectedGender: '',
            timeType: '',
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
    }
    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGE.VI ? item.valueVi : item.valueVi;;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux.data)
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                gender: this.buildDataGender(this.props.genderRedux.data)
            })
        }
        if (prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal) {
            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
                console.log("check check dataScheduleTimeModal: ", this.props.dataScheduleTimeModal)
                this.setState({
                    doctorId: this.props.dataScheduleTimeModal.doctorId,
                    timeType: this.props.dataScheduleTimeModal.timeType
                })
            }
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            dayOfBirth: date[0]
        })

    }
    handleOnChangInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }
    buildTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let date = (language === LANGUAGE.VI)
                ? moment.unix(+dataScheduleTimeModal.date / 1000).locale('vi').format('dddd - DD/MM/YYYY')
                : moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            let time = (language === LANGUAGE.VI) ? dataScheduleTimeModal.timeTypeData.valueVi :
                dataScheduleTimeModal.timeTypeData.valueEn;
            return (`${time} - ${date}`)
        }
        return ''
    }
    buildDoctorNameBooking = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let name = language === LANGUAGE.VI ? (`${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}`)
                : (`${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName}`)
            return name
        }
        return ''
    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.dayOfBirth).getTime();
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal)
        let nameDoctor = this.buildDoctorNameBooking(this.props.dataScheduleTimeModal)
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            email: this.state.email,
            date: this.props.dataScheduleTimeModal.date,
            birthDay: date,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            nameDoctor: nameDoctor
        });
        if (res && res.data && res.data.data && res.data.data.errCode === 0) {
            toast.success("Booking a new appointment success!")
            this.props.closeBookingModal();
            this.setState({
                fullName: "",
                phoneNumber: "",
                address: "",
                email: "",
                date: "",
                reason: "",
                doctorId: "",
                selectedGender: "",
                timeType: ""
            })
        } else {
            toast.error("Booking a new appointment failed!")
        }

    }
    render() {
        let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal, genderRedux } = this.props
        let { gender, selectedGender } = this.state
        let doctorId = '';
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            doctorId = dataScheduleTimeModal.doctorId
        }
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            // toggle={ } 
            <Modal isOpen={isOpenModalBooking} className='booking-modal-container'
                size='lg'
                centered
            // backdrop={true}
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className='right'
                            onClick={closeBookingModal}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div style={{ height: '100px' }}>
                            {/* {JSON.stringify(dataScheduleTimeModal)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataScheduleTimeModal={dataScheduleTimeModal}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.name' /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangInput(event, "fullName")}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                    <input className='form-control'
                                        value={this.state.phonNumber}
                                        onChange={(event) => this.handleOnChangInput(event, "phoneNumber")}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangInput(event, "email")}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangInput(event, "address")}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangInput(event, "reason")}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.dayOfBirth' /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.dayOfBirth}
                                        minDate={yesterday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        options={this.state.gender}
                                        onChange={this.handleChangeSelect}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-comfirm' onClick={() => this.handleConfirmBooking()} >
                            <FormattedMessage id='patient.booking-modal.confirm' />
                        </button>
                        <button className='btn-booking-cancel' onClick={closeBookingModal}>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </button>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.gender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
