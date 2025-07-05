import React, { Component } from 'react';
import { connect } from 'react-redux';
import { button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { createNewUserService } from '../../services/userService';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            city: '',
            gender: '1',
            roleId: '0'
        }
        this.listenToEmitter();
    };
    listenToEmitter = () => {
        // cách sử dụng emitter có truyền data
        // emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
        //     console.log('Listen emitter from parent: ', data)

        // })
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                city: '',
                gender: '1',
                roleId: '0'
            })
        })
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleUserModal();
    }
    handleOnchange = (e, field) => {
        let copyState = { ...this.state }
        copyState[field] = e.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'city', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUserService(this.state);
            console.log('Data modal', this.state)
        }

    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"modal-user-container"}
                size='lg'
                centered
            >

                <ModalHeader className='Modal-Title' toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} onChange={(e) => { this.handleOnchange(e, 'email') }}  ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(e) => { this.handleOnchange(e, 'password') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text' value={this.state.firstName} onChange={(e) => { this.handleOnchange(e, 'firstName') }} ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text' value={this.state.lastName} onChange={(e) => { this.handleOnchange(e, 'lastName') }}></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' value={this.state.address} onChange={(e) => { this.handleOnchange(e, 'address') }}></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Phone Number</label>
                            <input type='text' value={this.state.phoneNumber} onChange={(e) => { this.handleOnchange(e, 'phoneNumber') }}></input>
                        </div>
                        <div className='input-container between-width-input'>
                            <label>City</label>
                            <input type='text' value={this.state.city} onChange={(e) => { this.handleOnchange(e, 'city') }}></input>
                        </div>
                        <div className='input-container between-width-input'>
                            <label>Sex</label>
                            <select name='gender' className='form-control' value={this.state.gender} onChange={(e) => { this.handleOnchange(e, 'gender') }}>
                                <option value="1">Male</option>
                                <option value='0'>Female</option>
                            </select>
                        </div>
                        <div className='input-container between-width-input' >
                            <label>Role</label>
                            <select name='role' className='form-control' value={this.state.roleId} onChange={(e) => { this.handleOnchange(e, 'roleId') }}>
                                <option value='0'>Patient</option>'
                                <option value="1">Doctor</option>
                                <option value="2">Admin</option>
                            </select>
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <button color='primary' className='px-3' onClick={() => this.handleAddNewUser()} >Add new</button>
                    <button color='secondary' className='px-3' onClick={() => { this.toggle() }}>Close</button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
