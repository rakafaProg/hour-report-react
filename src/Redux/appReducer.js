import * as types from './actionTypes';

const initialState = {
    hourList: [],
    formData: {},
    filterBy: {}
};

const appReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.FETCH_HOUR_LIST_SUCCESS:
            return {
                ...state,
                hourList: action.payload,
                orderBy: '',
                filterBy: {}
            };
        case types.FILTERD_LIST_SUCCESS:
            return {
                ...state,
                hourList: action.payload
            }
        case types.SORT_CHANGED:
            return {
                ...state,
                orderBy: action.payload
            };
        case types.FILTER_CHANGED:
            return {
                ...state,
                filterBy: action.payload
            };
        case types.DATA_ERROR:
            return {
                ...state,
                formValidationError: action.payload,
                formSuccess: false,
            };
        case types.CLEAR_FORM_DATA:
            return {
                ...state,
                formData: {},
                formSuccess: false,
                formValidationError: null
            };
        case types.DATA_SAVED_SUCCESS:
            return {
                ...state,
                formData: {},
                formSuccess: true,
                formValidationError: null,
                hourList: action.payload
            };
        case types.DETAIL_CHANGED:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.key]: action.payload.value
                },
                formValidationError: null,
                formSuccess: false,
            }
        default: return state;
    }
}

export default appReducer;
