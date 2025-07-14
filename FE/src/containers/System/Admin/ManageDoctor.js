import React, { Component } from 'react';
import { escapeRegExp } from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            listDoctor: []
        }
    }
    componentDidMount() {
        // this.props.fetchAllDoctorRedux()
        this.props.fetchAllDoctorRedux()
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    handleSaveContentMarkdown = () => {
        console.log("doctor id: ", this.state.selectedOption.value)
        console.log("doctor id2: ", this.state.contentMarkdown)
        console.log("doctor id3: ", this.state.contentHTML,
        )
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        })
    }
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        const { selectedDoctor } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sỹ
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn bác sỹ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className='content-right'>
                        <label>thông tin giới thiệu</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button className='btn-save-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}>
                    Save
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorRedux: (event) => dispatch(actions.saveDetailDoctor(event))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
