import {
    SET_TANYOS,
    LIKE_TANYO,
    UNLIKE_TANYO,
    LOADING_DATA,
    DELETE_TANYO,
    POST_TANYO,
    SET_TANYO,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    tanyos: [],
    tanyo: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_TANYOS:
        return {
          ...state,
          tanyos: action.payload,
          loading: false
        };
      case SET_TANYO:
        return {
          ...state,
          tanyo: action.payload
        };
      case LIKE_TANYO:
      case UNLIKE_TANYO:
        var index = state.tanyos.findIndex(
          (tanyo) => tanyo.tanyoId === action.payload.tanyoId
        );
        state.tanyos[index] = action.payload;
        if (state.tanyo.tanyoId === action.payload.tanyoId) {
          state.tanyo = action.payload;
        }
        return {
          ...state
        };
      case DELETE_TANYO:
        index = state.tanyos.findIndex(
          (tanyo) => tanyo.tanyoId === action.payload
        );
        state.tanyos.splice(index, 1);
        return {
          ...state
        };
      case POST_TANYO:
        return {
          ...state,
          tanyos: [action.payload, ...state.tanyos]
        };
      case SUBMIT_COMMENT:
        return {
          
          ...state,
          tanyo: {
            ...state.tanyo,
            comments: [action.payload, ...state.tanyo.comments]
          }
         
        };
      default:
        return state;
    }
  }