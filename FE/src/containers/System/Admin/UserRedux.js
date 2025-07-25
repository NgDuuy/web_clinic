import React, { Component } from 'react';
import { escapeRegExp } from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE, CRUD_ACTIONS } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableManageUser from './TableManageUser'
import CommonUtils from '../../../utils/CommonUtils';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,


            userEditId: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',


            action: '',
        }
    }
    state = {

    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.data.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data.data
        //         })
        //     }
        //     console.log("respone: ", res)
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux.data
            console.log('arrGenders: ', arrGenders[0].keyMap);
            this.setState({
                genderArr: this.props.genderRedux.data,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux.data
            console.log('arrPositions: ', arrPositions[0].keyMap);
            this.setState({
                positionArr: this.props.positionRedux.data,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux.data
            console.log('arrRoles: ', arrRoles[0].keyMap);
            this.setState({
                roleArr: this.props.roleRedux.data,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux.data
            let arrPositions = this.props.positionRedux.data
            let arrRoles = this.props.roleRedux.data
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleOnChangImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log("Check base64 in handle on change image: ", base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) {
            return
        }
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidate();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                previewImgURL: this.state.previewImgURL,
                avatar: this.state.avatar
            })
        }

        // setTimeout(() => {
        //     this.props.fetchUserRedux();
        // }, 1000)
    }
    checkValidate = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',
            'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }

        this.setState({
            email: user.email,
            password: "Hash code",
            firstName: user.lastName,
            lastName: user.firstName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: imageBase64,
            userEditId: user.id
        })
        this.props.editUserRedux(this.state)
    }
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let isLoadingPosition = this.props.isLoadingPosition;
        let isLoadingRole = this.props.isLoadingRole;

        let {
            email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User redux manage create a new user
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-12'>{isLoadingGender === true ? "Loading genders" : ""}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, "firstName") }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phonenumber' /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control'
                                    value={gender}
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control'
                                    value={position}
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.roleid' /></label>
                                <select className='form-control'
                                    value={role}
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => { this.handleOnChangImage(event) }}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit' /> :
                                        <FormattedMessage id='manage-user.save' />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />

                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.gender,
        positionRedux: state.admin.position,
        roleRedux: state.admin.role,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (userData) => dispatch(actions.editUserStart(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
