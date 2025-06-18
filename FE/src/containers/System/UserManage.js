import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import { identity } from 'lodash';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUser: [],
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('All');
        let data = response.data;
        if (data && data.errCode == 0) {
            this.setState({
                arrayUser: data.users
            }, () => {
                console.log('Check state user ', this.state.arrayUser)
                // Callback ở đây dùng callback để in ra mà hình thông tin và tránh việc bị bất đồng bộ
            })

        }
    }


    render() {
        console.log('Check render ', this.state)
        let arrayUser = this.state.arrayUser;
        return (
            <div className="user-container">
                <div className='title text-center'>
                    Manage user
                </div>
                <div className='mt-4 mx-3'>
                    <table className="users-table ">
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
