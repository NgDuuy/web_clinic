import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import Home from '../../../routes/Home';
import './DetailSpecialty.scss'
import { getDetailInforService } from '../../../services/userService';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getDetailSpecialtyById } from '../../../services/userService';
import _, { create } from 'lodash';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailSpecialty: {},
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        await this.props.fetchAllSpecialty()
        let { allSpecialty } = this.props;
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let detailSpecialty = allSpecialty.find(item => String(item.id) === String(id));
            if (detailSpecialty) {
                this.setState({
                    detailSpecialty: detailSpecialty
                })
            }
        }
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let resProvince = await getAllCodeService("PROVINCE")
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'All'
            });
            let data = res.data.data;
            if (data && data.errCode === 0 && resProvince && resProvince.data.errCode === 0) {
                let data1 = data.data;
                console.log("Check data: ", data1);
                let arrDoctorId = [];
                if (data1 && !_.isEmpty(data1)) {
                    let arr = data1.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'All',
                        type: "PROVINCE",
                        valueEn: 'All',
                        valueVi: 'Toàn Quốc',
                    })
                }
                this.setState({
                    dataDetailSpecialty: data.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapashot) {

    }
    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });
            let data = res.data.data;
            if (data && data.errCode === 0) {
                let data1 = data.data;
                console.log("Check data: ", data1);
                let arrDoctorId = [];
                if (data1 && !_.isEmpty(data1)) {
                    let arr = data1.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: data.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    render() {
        let { language } = this.props
        let { detailSpecialty, arrDoctorId, listProvince } = this.state;
        let nameEn = "", nameVi = "";
        if (detailSpecialty && detailSpecialty.name) {
            nameVi = `${detailSpecialty.name}`;
            nameEn = `${detailSpecialty.name}`;
        }
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowBanner={false} />
                <div className='detail-specialty-body'>
                    <div className='decription-specialty'>
                        {language === LANGUAGE.VI ? nameVi : nameEn}
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailSpecialty && detailSpecialty.descriptionHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
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
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
