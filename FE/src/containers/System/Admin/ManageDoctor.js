import React, { Component } from 'react';
import { escapeRegExp } from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGE } from '../../../utils/constant';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforService } from '../../../services/userService';
;
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
            //Save markdown table
            selectedOption: '',
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            listDoctor: [],
            hasOldData: false,
            action: '',
            // Save to doctor infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }
    componentDidMount() {
        // this.props.fetchAllDoctorRedux()
        this.props.fetchAllDoctorRedux()
        this.props.getRequiredDoctorInforStartRedux()
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let Object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    Object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    Object.value = item.id;
                    result.push(Object);
                })
            }
            else if (type === "PRICE") {
                inputData.map((item, index) => {
                    let Object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    Object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    Object.value = item.keyMap;
                    result.push(Object);
                })
            }
            else if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let Object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    Object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    Object.value = item.keyMap;
                    result.push(Object);
                })
            }
            else if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let Object = {};
                    Object.label = item.name;
                    Object.value = item.id;
                    result.push(Object);
                })
            }
            else if (type === "CLINIC") {
                inputData.map((item, index) => {
                    let Object = {};
                    Object.label = item.name;
                    Object.value = item.id;
                    result.push(Object);
                })
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            console.log("check resClinic: ", resClinic)
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            let listPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let listPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let listSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let listClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listDoctor: dataSelect,
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
                listClinic: listClinic
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let listPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let listPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let listSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let listClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
                listClinic: listClinic
            })
        }
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInforService(selectedOption.value);
        if (res.data && res.data.errCode === 0 && res.data.data.Markdown) {
            let markdown = res.data.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialityId = '', clinicId = '';
            let selectedPaymentId = '', selectedPriceId = '', selectedProvinceId = '', selectedSpecialty = '', selectedClinic = '';
            if (res.data.data.doctor_Infor) {
                addressClinic = res.data.data.doctor_Infor.addressClinic;
                nameClinic = res.data.data.doctor_Infor.nameClinic;
                note = res.data.data.doctor_Infor.note;
                paymentId = res.data.data.doctor_Infor.paymentId;
                priceId = res.data.data.doctor_Infor.priceId;
                provinceId = res.data.data.doctor_Infor.provinceId;
                specialityId = res.data.data.doctor_Infor.specialtyId;
                clinicId = res.data.data.doctor_Infor.clinicId
                selectedPaymentId = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPriceId = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvinceId = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialityId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPriceId,
                selectedPayment: selectedPaymentId,
                selectedProvince: selectedProvinceId,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }
        else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }

    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state }
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : null,
            specialtyId: this.state.selectedSpecialty.value
        })
    }
    handleOnChangText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    render() {
        const { selectedDoctor, hasOldData, listPayment, listPrice,
            listProvince, listSpecialty, selectedSpecialty } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.introduction" /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangText(event, "description")}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.address" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.speciality" /></label>
                        <Select
                            value={selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-speciality" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className='btn-save-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData === true ?
                        <span> <FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInforStartRedux: () => dispatch(actions.getRequiredDoctorInforStart()),
        saveDetailDoctorRedux: (event) => dispatch(actions.saveDetailDoctor(event))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
