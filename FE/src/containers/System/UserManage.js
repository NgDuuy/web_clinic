import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUser } from '../../services/userService';
import ModalUser from './ModalUser'

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUser: [],
            isOpenModalUser: false
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
    createNewUser = async (data) => {
        try {
            let response = await createNewUser(data);
            if (response && response.data.errCode !== 0) {
                alert(response.data.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
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
                    createNewUser={this.createNewUser}
                />
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
                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete'><i className='fas fa-trash'></i></button>
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
