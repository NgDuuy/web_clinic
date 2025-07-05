import React, { Component } from 'react';
import { escapeRegExp } from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false
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
            this.setState({
                genderArr: this.props.genderRedux.data
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux.data,
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux.data
            })
        }
    }
    handleOnChangImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl
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
    render() {
        console.log("check state: ", this.state)
        let genders = this.state.genderArr;
        let position = this.state.positionArr;
        let role = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        // let isLoadingPosition = this.props.isLoadingPosition;
        // let isLoadingRole = this.props.isLoadingRole;
        console.log('Check state1: ', this.props.genderRedux)
        console.log('Is loading Gender: ', isLoadingGender)
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
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phonenumber' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className='form-control'>
                                    {position && position.length > 0 &&
                                        position.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.roleid' /></label>
                                <select className='form-control'>
                                    {role && role.length > 0 &&
                                        role.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
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
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.save' /></button>
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
        isLoadingRole: state.admin.isLoadingRole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
