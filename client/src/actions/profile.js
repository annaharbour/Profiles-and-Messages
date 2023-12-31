import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
    
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data

        });
    } catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
      const res = await axios.get('/api/profile');

      dispatch({
          type: GET_PROFILES,
          payload: res.data

      });
  } catch(err){
      dispatch({
          type: PROFILE_ERROR,
          payload: {
              msg: err.response.statusText,
              status: err.response.status
          }
      });
  }
};

//Get profile by id
export const getProfileById = (userId) => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
          type: GET_PROFILE,
          payload: res.data

      });
  } catch(err){
      dispatch({
          type: PROFILE_ERROR,
          payload: {
              msg: err.response.statusText,
              status: err.response.status
          }
      });
  }
};

//Create or update a profile
export const createProfile = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(
            setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
        );

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}


// Add Experience
export const addExperience = (formData) => async (dispatch) => {
    try {
      const res = await axios.put('/api/profile/experience', formData);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Add Education
  export const addEducation = (formData) => async (dispatch) => {
    try {
      const res = await axios.put('/api/profile/education', formData);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete experience
  export const deleteExperience = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete education
  export const deleteEducation = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  //Delete account & profile
  //Delete account & profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        const res = await axios.delete('/api/profile');
        
        dispatch({
          type: CLEAR_PROFILE,
          payload: res.data
        });
        dispatch({
            type: ACCOUNT_DELETED
        });
        
        dispatch(setAlert('Account permanently deleted', 'success'));
        //Get remove index
  
      } catch(err){
         dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
         });
      }
    }
  };
  