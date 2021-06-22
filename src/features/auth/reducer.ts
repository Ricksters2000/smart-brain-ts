import type {AuthFormState, AuthUserActionType} from './types';
import type {User} from '../commonTypes';
import {AUTH_SUCCESS, AUTH_PENDING, AUTH_FAILED, SUBMIT_ENTRY, SIGNOUT} from '../actionTypes';

const initialState = {
    id: -1,
} as AuthFormState

export default (state=initialState, action: AuthUserActionType): AuthFormState => {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {...state, id: action.payload.id, user: action.payload.user, err: undefined};
        case AUTH_PENDING:
            return state;
        case AUTH_FAILED:
            return {...state, err: action.err};
        case SUBMIT_ENTRY:
            return {...state, user: {...state?.user, entries: action.payload?.user?.entries} as User}
        case SIGNOUT:
            return {...initialState};
        default:
            return state;
    }
}