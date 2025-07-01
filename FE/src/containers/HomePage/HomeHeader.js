import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Section/HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils/constant';

import { changeLanguage } from '../../store/actions/appActions';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        let language = this.props.language
        console.log("Check userInfo: ", this.props.userInfo);
        return (
            <React.Fragment>
                <div className='HomeHeader-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id='homeheader.speciality' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.health-facility' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.fee' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.check-health' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"> <FormattedMessage id='homeheader.support' /></i></div>
                            <div className={language === LANGUAGE.VI ? 'language-vi action' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span></div>
                            <div className={language === LANGUAGE.EN ? 'language-en action' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span ></div>
                        </div>
                    </div>
                </div >
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id='banner.title1' />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id='banner.title2' />
                        </div>
                        <div className='search' >
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'><i className='far fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id='banner.child1' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                <div className='text-child'><FormattedMessage id='banner.child2' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                <div className='text-child'><FormattedMessage id='banner.child3' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vial"></i></div>
                                <div className='text-child'><FormattedMessage id='banner.child4' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                <div className='text-child'><FormattedMessage id='banner.child5' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                <div className='text-child'><FormattedMessage id='banner.child6' /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    console.log("dispatch: ")
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
