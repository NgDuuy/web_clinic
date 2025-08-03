import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils/constant';
import { withRouter } from 'react-router';
// import "slick-carousel/slick/slick-theme.css"
class Specailty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listArrSpecialty: []
        }
    }
    componentDidMount() {
        this.props.fetchAllSpecialty();
    }
    componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                listArrSpecialty: this.props.allSpecialty
            })
        }
    }
    handleViewSpecialty = (data) => {
        this.props.history.push(`/detail-specialty/${data.id}`);
    }
    render() {
        let { language } = this.props
        let { listArrSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listArrSpecialty && listArrSpecialty.length > 0 &&
                                listArrSpecialty.map((item, index) => {
                                    let nameVi = `${item.name}`;
                                    let nameEn = `${item.name}`;
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewSpecialty(item)} >
                                            <div className='customize-border'>
                                                <div className='outer-background'>
                                                    <div className='bg-image section-specialty'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specailty));
