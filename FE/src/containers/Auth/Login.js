import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import userIcon from '../../../src/assets/images/user.svg';
import passIcon from '../../../src/assets/images/pass.svg';
import './Login.scss';
import adminService from '../../services/adminService';
import { handleLoginApi } from '../../services/userService';
import { reject } from 'lodash';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        console.log('in function handleLogin')
        try {
            let response = await handleLoginApi(this.state.username, this.state.password);
            let data = response.data
            if (data && data.errCode !== 0) {
                console.log('in data && data.errCode !==0')
                this.setState({
                    errMessage: data.message
                })
            }
            console.log('errCode: ', data)
            if (data && data.errCode === 0) {
                console.log('login succeed')
                this.props.userLoginSucceed(data.user);
                // this.props.navigate('/system/user-manage');
            }

        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('Error', error.response);
            // this.setState({
            //     errMessage: e.message
            // })
        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    render() {
        return (

            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login' >LOGIN</div>
                        <div className='col-12 form-group'>
                            <label>Username</label>
                            <input type='text'
                                className='form-control login-input'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group'>
                            <lable>Password:</lable>
                            <div className='Custom-input-password' >
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                ></input>
                                <span
                                    onClick={() => this.handleShowHidePassword()}
                                >
                                    <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: ' red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className='col-12 mt-5'>
                            <span className='forgot-password'>Forgot your Password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g icon-google"></i>
                            <i className="fab fa-facebook-f icon-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSucceed: (userInfor) => dispatch(actions.userLoginSucceed(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
