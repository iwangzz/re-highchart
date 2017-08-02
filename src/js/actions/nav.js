import *  as actionTypes from '../constants/actionTypes'

export function switchNav(filter) {
    return {
        type: actionTypes.SWITCH_NAV,
        filter
    }
}