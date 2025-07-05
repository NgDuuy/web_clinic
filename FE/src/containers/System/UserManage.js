import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, editUserInfo, deleteUser } from '../../services/userService';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import { use } from 'react';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import { getTextOfJSDocComment } from 'typescript';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        let data = response.data;
        if (data && data.errCode === 0) {
            this.setState({
                arrayUser: data.users
            }, () => {
                console.log('Check state user ', this.state.arrayUser)
                // Callback ở đây dùng callback để in ra mà hình thông tin và tránh việc bị bất đồng bộ
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,


        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUserService = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                // Đây là cách truyền datadata
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    handleDeleteUser = async (userData) => {
        try {
            let response = await deleteUser(userData.id)
            await this.getAllUserFromReact()
        }
        catch (e) {
            console.log(e)
        }
    }
    handleEditUserInfo = async (userData) => {
        try {
            this.setState({
                isOpenModalEditUser: true,
                userEdit: userData
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    editUserInfo = async (user) => {
        try {
            let res = await editUserInfo(user);
            this.setState({
                isOpenModalEditUser: false,
            })
            await this.getAllUserFromReact();
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        console.log('Check render ', this.state)
        let arrayUser = this.state.arrayUser;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    test={'ads'}
                    createNewUserService={this.createNewUserService}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleModalEditUser={this.toggleModalEditUser}
                        editUserInfo={this.editUserInfo}
                        currentUser={this.state.userEdit}
                    />
                }


                <div className='title text-center'>
                    Manage user
                </div>
                <div className="mx-1">
                    <button className='btn btn-primary px-3'
                        onClick={this.handleAddNewUser}
                    ><i className='fas fa-plus'></i>Add new user</button>
                </div>
                <div className='mt-4 mx-3'>
                    <table className="users-table ">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrayUser && arrayUser.map((item, index) => {
                                console.log('eric check map ', item, index)
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={(e) => this.handleEditUserInfo(item)}><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete' onClick={(e) => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
