import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from '../../../src/assets/images/user.svg';
import passIcon from '../../../src/assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login' >LOGIN</div>
                        <div className='col-12 form-group'>
                            <label>Username</label>
                            <input type='text' className='form-control login-input' placeholder='Enter your username'></input>
                        </div>
                        <div className='col-12 form-group'>
                            <lable>Password:</lable>
                            <input type='text' className='form-control login-input' placeholder='Enter your password'></input>
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login'>Login</button>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
