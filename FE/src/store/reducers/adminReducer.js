import { faL } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../actions/actionTypes';
import { act } from 'react';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    gender: [],
    role: [],
    position: []
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
            console.log('fire fetch gender success', state)
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
        default:
            return state;
    }
}

export default adminReducer;