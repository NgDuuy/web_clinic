import React, { Component } from 'react';
import { escapeRegExp } from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils/constant';
import * as actions from '../../../store/actions'
import './TableManageUser.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                listUsers: this.props.listUsers
            })
        }
    }
    handleDeleteUser = async (user) => {
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser = (userData) => {
        this.props.handleEditUserFromParent(userData)
    }
    render() {
        let listUsers = this.props.listUsers
        return (
            <React.Fragment>
                <div className=''>
                    <table className='users-table'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {listUsers && listUsers.length > 0
                                && listUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={(e) => this.handleEditUser(item)}> <i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={(e) => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUserStart(userId)),
        editUserRedux: (user) => dispatch(actions.editUserStart(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
