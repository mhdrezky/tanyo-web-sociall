import {
  SET_TANYOS,
  LOADING_DATA,
  LIKE_TANYO,
  UNLIKE_TANYO,
  DELETE_TANYO,
  SET_ERRORS,
  POST_TANYO,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_TANYO,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all Tanyos
export const getTanyos = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/tanyos')
    .then((res) => {
      dispatch({
        type: SET_TANYOS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_TANYOS,
        payload: []
      });
    });
};
export const getTanyo = (tanyoId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/tanyo/${tanyoId}`)
    .then((res) => {
      dispatch({
        type: SET_TANYO,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a Tanyo
export const postTanyo = (newTanyo) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/tanyo', newTanyo)
    .then((res) => {
      dispatch({
        type: POST_TANYO,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a Tanyo
export const likeTanyo = (tanyoId) => (dispatch) => {
  axios
    .get(`/tanyo/${tanyoId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_TANYO,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a Tanyo
export const unlikeTanyo = (tanyoId) => (dispatch) => {
  axios
    .get(`/tanyo/${tanyoId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_TANYO,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (tanyoId, commentData) => (dispatch) => {
  axios
    .post(`/tanyo/${tanyoId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteTanyo = (tanyoId) => (dispatch) => {
  axios
    .delete(`/tanyo/${tanyoId}`)
    .then(() => {
      dispatch({ type: DELETE_TANYO, payload: tanyoId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_TANYOS,
        payload: res.data.tanyos
      });
    })
    .catch(() => {
      dispatch({
        type: SET_TANYOS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};