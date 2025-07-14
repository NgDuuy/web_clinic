import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About'
import HomeFooter from './HomeFooter';
import './HomePage.scss'
import "slick-carousel/slick/slick.css"
// import { SampleNextArrow, SamplePrevArrow } from './Section/CustomArrows'

function SampleNextArrow(props) {
    const { className, style, onClick, currentSlide, slideCount } = props;
    const isDisabled = currentSlide >= slideCount - 4;
    if (isDisabled) return null;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                border: "1px solid #00bcd4", // viền xanh
                borderRadius: "50%",          // bo tròn
                width: "40px",
                height: "40px",
                color: "#00bcd4",             // màu icon
                zIndex: 10,
                position: "absolute",     // thêm position tuyệt đối
                right: "-20px",           // đẩy ra ngoài bên phải
                top: "50%",               // căn giữa theo chiều dọc
                transform: "translateY(-50%)", // căn giữa chính xác
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            <i className="fas fa-chevron-right"></i>
        </div>
    )
}
function SamplePrevArrow(props) {
    const { className, style, onClick, currentSlide } = props;
    const isDisabled = currentSlide === 0;
    if (isDisabled) return null;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                border: "1px solid #00bcd4", // viền xanh
                borderRadius: "50%",          // bo tròn
                width: "40px",
                height: "40px",
                color: "#00bcd4",             // màu icon
                zIndex: 10,
                position: "absolute",
                left: "-20px",           // đẩy ra ngoài bên trái
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer"
            }}
            onClick={onClick} >
            <i className="fas fa-chevron-left"></i>
        </div>
    );
}
class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutstandingDoctor
                    settings={settings} />
                <HandBook
                    settings={settings} />
                <About />
                <HomeFooter />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
