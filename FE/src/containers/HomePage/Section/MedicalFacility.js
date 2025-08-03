import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.data.data.errCode === 0) {
            this.setState({
                dataClinic: res.data.data.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapashot) {

    }
    handleViewClinic = (data) => {
        console.log("Check history: ", this.props.history)
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${data.id}`);
        }

    }
    render() {
        let { dataClinic } = this.state;
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewClinic(item)} >
                                            <div className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>
                                            <div>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
