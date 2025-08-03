import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getGetListPatientForDoctor, sendRemedy } from '../../../services/userService'
import moment from 'moment';
import { LANGUAGE } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            datePatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            email: '',
            imgBase64: '',
            isShowLoading: false
        }
    }


    async componentDidMount() {
        this.getDataPatient();
    }
    async componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.user !== this.props.user) {
            this.getDataPatient();
        }

    }
    getDataPatient = async () => {
        let { user } = this.props;
        user = user.user;
        let { currentDate } = this.state;
        let res = await getGetListPatientForDoctor({
            id: user.id,
            date: currentDate
        })
        if (res && res.data.errCode === 0) {
            this.setState({
                datePatient: res.data.data
            })
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: moment(date[0]).valueOf()
        }, async () => {
            await this.getDataPatient();
        })
    }
    handleBtnConfirm = (item) => {
        console.log("Check id")
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        console.log("Check data: ", data)
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChildFromModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await sendRemedy({
            email: dataChildFromModal.email,
            imgBase64: dataChildFromModal.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.data && res.data.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy success')
            this.closeRemedyModal();
            await this.getDataPatient();
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send remedy failed ')
        }
    }
    render() {
        let { datePatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        console.log("Check state: ", this.state)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading .....'
                >
                    <div className='manage-patient-container'>
                        <div className='manage-patient-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }} >
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và Tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datePatient && datePatient.length > 0 ?
                                            datePatient.map((item, index) => {
                                                let gender = language === LANGUAGE.VI
                                                    ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let timeTypeDataPatient = language === LANGUAGE.VI
                                                    ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let name = item.patientData && item.patientData.firstName
                                                    ? item.patientData.firstName : '';
                                                let address = item.patientData && item.patientData.address
                                                    ? item.patientData.address : ''
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{timeTypeDataPatient}</td>
                                                        <td>{name}</td>
                                                        <td>{address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : <tr>
                                                <td> Không có dữ liệu</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div >
                    <RemedyModal
                        isOpenRemedyModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
