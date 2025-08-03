import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGE } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from '../../../utils/CommonUtils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.fileInputRef = React.createRef();
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }


    async componentDidMount() {
        this.props.fetchAllClinicRedux()
    }

    async componentDidUpdate(prevProps, prevState, snapashot) {

    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnChangImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        let data = res.data;
        console.log("Check check: ", data.data.errCode)
        if (data && data.data.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
            if (this.fileInputRef.current) {
                this.fileInputRef.current.value = '';
            }
            toast.success('Create a new clinic success')
        }
        else {
            toast.error('Create a new clinic failed')
        }

    }
    render() {
        return (
            <div className='manage-clinic-container'>
                <div className='manage-clinic-title'>
                    Quản lý cơ sở y tếtế
                </div>
                <div className='add-new-clinic'>
                    <div className='add-new-clinic-input'>
                        <div className='col-4 form-group'>
                            <label>Tên cơ sở y tế</label>
                            <input className='form-control' type='text'
                                value={this.state.name} onChange={(Event) => this.handleOnChangeInput(Event, 'name')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Address</label>
                            <input className='form-control' type='text'
                                value={this.state.address} onChange={(Event) => this.handleOnChangeInput(Event, 'address')}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tải ảnh cơ sở y tế</label>
                            <input className='form-control' type='file'
                                ref={this.fileInputRef}
                                onChange={(Event) => this.handleOnChangImage(Event)}
                            />
                        </div>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-new-clinic'
                            onClick={() => this.handleSaveNewClinic()}
                        >Lưu</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
