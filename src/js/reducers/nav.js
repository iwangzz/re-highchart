import * as actionTypes from '../constants/actionTypes'

const initialState = {
    type: actionTypes.SWITCH_NAV,
    filter: 'HOME'
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actionTypes.SWITCH_NAV: 
            return {
                type:SWITCH_NAV,
                filter: action.filter
            }
        break;
    }
    return state;
}