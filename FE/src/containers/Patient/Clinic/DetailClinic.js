import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import Home from '../../../routes/Home';
import './DetailClinic.scss'
import { getDetailClinicById } from '../../../services/userService';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _, { create } from 'lodash';
class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinicById({
                id: id
            });
            let data = res.data.data;
            if (data && data.errCode === 0) {
                let data1 = data.data;
                console.log("Check data1: ", data1)
                let arrDoctorId = [];
                if (data1 && !_.isEmpty(data1)) {
                    let arr = data1.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: data.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapashot) {

    }
    render() {
        let { language } = this.props
        let { dataDetailClinic, arrDoctorId } = this.state;
        let nameEn = "", nameVi = "";
        if (dataDetailClinic && dataDetailClinic.name) {
            nameVi = `${dataDetailClinic.name}`;
            nameEn = `${dataDetailClinic.name}`;
        }
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowBanner={false} />
                <div className='detail-specialty-body'>
                    <div className='decription-specialty'>
                        {language === LANGUAGE.VI ? nameVi : nameEn}
                    </div>
                    <div className='detail-infor-doctor'>
                        {dataDetailClinic && dataDetailClinic.descriptionHTML &&
                            <>
                                <div>{dataDetailClinic.address}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                </div>
                            </>
                        }
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataScheduleTimeModal={dataScheduleTimeModal}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParennt={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParennt={item}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
