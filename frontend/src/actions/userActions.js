import axios from 'axios';
import {
    clearAuthError,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    loadUserRequest,
    loadUserSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    logoutFail,
    logoutSuccess,
    registerFail,
    registerRequest,
    registerSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    resetPasswordFail,
    resetPasswordSuccess,
    resetPasswordRequest,
    loadUserFail
} from '../slices/authSlice';
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from '../slices/userSlice';

export const login = (email, password) => async dispatch => {

    try {
        dispatch(loginRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
        dispatch(loginSuccess(data))
    } catch (error) {
        //handle error
        dispatch(loginFail(error.response.data.message))
    }

}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/register`, userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        //handle error
        dispatch(registerFail(error.response.data.message))
    }


}

export const clearError = dispatch => {
    dispatch(clearAuthError())
}

export const loadUser = async dispatch => {
    try {
        dispatch(loadUserRequest())

        const { data } = await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        //handle error
        dispatch(loadUserFail(error.response.data.message))
    }

}

export const logout = async dispatch => {
    try {

        await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        //handle error
        dispatch(logoutFail())
    }

}


export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProfileFail(error.response.data.message))
    }


}
export const UpdatePassword = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        dispatch(updatePasswordRequest())
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        //handle error
        dispatch(updatePasswordFail(error.response.data.message))
    }


}

export const forgotPassword = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        dispatch(forgotPasswordRequest())
        const { data } = await axios.post(`/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data.message))
    } catch (error) {
        //handle error
        dispatch(forgotPasswordFail(error.response.data.message))
    }


}
export const resetPassword = (formData, token) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        dispatch(resetPasswordRequest())
        const { data } = await axios.post(`/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        //handle error
        dispatch(resetPasswordFail(error.response.data.message))
    }


}

export const getUsers = async dispatch => {
    try {
        dispatch(usersRequest())

        const { data } = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data))
    } catch (error) {
        //handle error
        dispatch(usersFail(error.response.data.message))
    }
}

export const getUser = id => async dispatch => {
    try {
        dispatch(userRequest())

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        //handle error
        dispatch(userFail(error.response.data.message))
    }
}

export const deleteUser = id => async dispatch => {
    try {
        dispatch(deleteUserRequest())

        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteUserFail(error.response.data.message))
    }
}

export const updateuser = (id, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        dispatch(updateUserRequest())
        await axios.put(`/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        //handle error
        dispatch(updateUserFail(error.response.data.message))
    }


}




















