import actionTypes from '../actions/actionTypes';
const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    gender: [],
    role: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: {},
    allSpecialty: [],
    allClinic: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire fetch gender start', action)
            let copyState = { ...state };
            copyState.isLoadingGender = true;

            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // let copyState1 = { ...state };
            state.gender = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // let state = { ...state };
            state.gender = [];
            state.isLoadingGender = false;
            console.log('fire fetch gender faile1d', action)
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_START:
            let copyState2 = { ...state };
            copyState2.isLoadingPosition = true;
            return {
                ...copyState2
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            state.isLoadingPosition = false;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = [];
            state.isLoadingPosition = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_START:
            let copyState3 = { ...state };
            copyState3.isLoadingRole = true;
            return {
                ...copyState3
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data;
            state.isLoadingRole = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.role = [];
            state.isLoadingRole = false;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_DOCTOR_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.dataAllSpecialty;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.allSpecialty = [];
            return {
                ...state
            }
        // case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
        //     state.allClinic = action.dataAllClinic;
        //     return {
        //         ...state
        //     }
        // case actionTypes.FETCH_ALL_CLINIC_FAILED:
        //     state.allClinic = [];
        //     return {
        //         ...state
        //     }
        default:
            return state;
    }
}

export default adminReducer;