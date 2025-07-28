import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import './verifyEmail.scss'
class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }


    async componentDidMount() {
        console.log("Check props: ", this.props)
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token, doctorId: doctorId
            })
            let data = res.data
            console.log("Check res: ", data)
            if (data && data.data.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: data.data.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: data.data && data.data.errCode ? data.data.errCode : -1,
                })
            }
        }
        if (this.props.match && this.props.match.params) {

        }
    }

    async componentDidUpdate(prevProps, prevState, snapashot) {

    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>
                            Loading data ...
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='inforBooking'>
                                    Xác nhận lịch hẹn thành công
                                </div>
                                :
                                errCode === 2 ?
                                    <div className='inforBooking'> Lịch hẹn được xác nhận</div>
                                    :
                                    <div className='inforBooking'>Lịch hẹn không tồn tại vui lòng thử lại</div>
                            }
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
