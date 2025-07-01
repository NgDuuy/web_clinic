import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// import "slick-carousel/slick/slick-theme.css"
class About extends Component {
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    GAM vs FUR | Ván 5 | MSI 2025 - Vòng Khởi Động
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/Xq2NsbcIrsE"
                            title="GAM vs FUR | Ván 5 | MSI 2025 - Vòng Khởi Động | Hoàng Luân Co-stream"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <div>
                            <p>
                                GAM vs FUR | Ván 5 | MSI 2025 - Vòng Khởi Động | Hoàng Luân Co-stream

                                Tham gia làm hội viên của kênh này để được hưởng đặc quyền:
                                / @hoangluanblv

                                #Lu #HoangLuan
                                Insta:   / h3luan
                                Fanpage :   / hoangluanblv
                                Group :   / 239702707265277

                                Nếu bạn thích xem video này!Bạn sẽ muốn xem các Playlist dưới đây ⬇️
                                ➡️    • Góc Của Lu Talk Show
                                ➡️    • Lu Kể Bạn Nghe
                                ➡️    • Lu Reaction
                                -------------------------------------------------------------------------------
                                Liên hệ hợp tác:
                                Hotline: 098 842 88 15
                                Mail: booking@box.studio
                                Anh em xem video nhớ cho cái sub và thả cái like nha. Yêu anh em!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
