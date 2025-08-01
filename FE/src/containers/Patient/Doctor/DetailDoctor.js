import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import Home from '../../../routes/Home';
import './DetailDoctor.scss'
import { getDetailInforService } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforService(id)
            let data = res.data;
            if (data && data.errCode === 0) {
                this.setState({
                    detailDoctor: data.data,
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapashot) {

    }
    render() {
        let { language } = this.props
        let { detailDoctor } = this.state;
        let nameEn = "", nameVi = "";
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='title-doctor'>
                                {language === LANGUAGE.VI ? nameVi : nameEn}
                            </div>
                            <div className='content-doctor'>
                                {detailDoctor
                                    && detailDoctor.Markdown
                                    && detailDoctor.Markdown.description
                                    &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParennt={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor doctorIdFromParennt={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment'>

                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
