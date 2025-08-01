import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUser, editUserInfo, getAllDoctorTop,
    getAllDoctor, saveDetailDoctorSevice, getDoctorPriceService
} from '../../services/userService';
import { create } from 'lodash';
import { toast } from 'react-toastify';
import { dispatch } from '../../redux';
import { type } from 'os';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error: ", e);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService("POSITION");
            if (res && res.data.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        }
        catch (e) {
            console.log(e)
            dispatch(fetchPositionFailed());
            console.log("Fetch position failed error: ", e);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService("ROLE");
            if (res && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        }
        catch (e) {
            console.log(e)
            dispatch(fetchRoleFailed());
            console.log("Fetch position failed error: ", e);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const createNewUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(userData);
            if (res && res.data.errCode === 0) {
                toast.success('Create a new user success')
                dispatch(createUserSuccess(res.data))
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(createUserFailed());
            }
        } catch (e) {
            console.log(e)
            dispatch(createUserFailed())
        }
    }
}
export const createUserSuccess = (userData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: userData
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})
export const editUserStart = (userData) => {
    return async (dispatch, getState) => {
        try {
            console.log("In edit user start try: ")
            let res = await editUserInfo(userData)
            if (res && res.data.errCode === 0) {
                toast.success('Update user information success')
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart())
            }
            else {
                dispatch(editUserFailed());
            }

        }
        catch (e) {
            console.log("In edit user start: ", e);
            dispatch(editUserFailed());
        }
    }
}
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: data
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const deleteUserStart = (dataId) => {
    return async (dispatch, getState) => {
        try {
            console.log("In delete user start try: ")
            let res = await deleteUser(dataId)
            if (res && res.data.errCode === 0) {
                toast.success('Delete user success')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error('Delete user error!')
                dispatch(deleteUserFailed());
            }

        }
        catch (e) {
            console.log("In delete user start: ", e);
            dispatch(deleteUserFailed());
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All')
            let data = res.data;
            console.log('In fetch All user start: ', data)
            if (data && data.errCode === 0) {
                dispatch(fetchAllUserSuccess(data.users.reverse()));
            }
            else {
                toast.error('Fetch All User error!')
                dispatch(fetchAllUserFailed());
            }
        }
        catch (e) {
            console.log("Fetch all users failed", e);
            dispatch(fetchAllUserFailed())
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})
export const fetchAllDoctorTop = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorTop('10');
            let data = res.data;
            if (data && data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: data.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log('Fetch all doctor top error: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            let data = res.data;
            if (data && data.errCode === 0) {
                dispatch({
                    dataDoctors: data.data,
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log('Fetch all doctor error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorSevice(data);
            console.log('Res in save detail doctor', res);
            if (res.data && res.data.errCode === 0) {
                toast.success('Save detail doctor success!')
                dispatch({
                    dataDoctors: res.data,
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            }
            else {
                toast.error('Save detail doctor error1!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log('Save detail doctor error2: ', e)
            toast.error('Save detail doctor error!')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}


export const fetchAllCodeScheduleHours = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            let data = res.data;
            if (data && data.errCode === 0) {
                dispatch({
                    dataTime: data.data,
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_SUCCESS
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_FAILED
                })
            }
        }
        catch (e) {
            console.log('Fetch all schedule hours doctor error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_FAILED
            })
        }
    }
}
export const getRequiredDoctorInforStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE")
            if (resPrice && resPrice.data.errCode === 0 &&
                resPayment && resPayment.data.errCode === 0 &&
                resProvince && resProvince.data.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data.data,
                    resPayment: resPayment.data.data,
                    resProvince: resProvince.data.data
                }
                dispatch(fetchAllRequiredSuccess(data));
            }
            else {
                dispatch(fetchAllRequiredFailed());
            }
        } catch (e) {
            dispatch(fetchAllRequiredFailed());
            console.log("fetchAllRequiredFailed error: ", e);
        }
    }
}
export const fetchAllRequiredSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchAllRequiredFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})
// export const fetchAllDoctorTop