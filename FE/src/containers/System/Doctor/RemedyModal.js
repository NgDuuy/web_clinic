import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { toast } from 'react-toastify';
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import moment from 'moment';
import { CommonUtils } from '../../../utils';
class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''
        }
    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                imgBase64: this.props.dataModal.imgBase64
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapashot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                imgBase64: this.props.dataModal.imgBase64
            })
        }
    }
    handleOnChangeEmail = (event) => {
        this.state({
            email: event.target.value
        })
    }
    handleOnChangImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenRemedyModal, closeRemedyModal } = this.props;
        return (
            // toggle={ } 
            <Modal isOpen={isOpenRemedyModal} className='booking-modal-container'
                size='lg'
                centered
            // backdrop={true}
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden='true'>X</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file hóa đơn</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.handleSendRemedy()}>Send</Button>
                    <Button onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
