import * as types from './ActionTypes';

const initialState = {
    list: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_ENTRY:
        case types.DELETE_ENTRY:
        case types.EDIT_ENTRY:
        case types.UPDATE_ENTRY:
            return {
                ...state,
                list: action.payload,
            }
        default:
            return state
    }
}