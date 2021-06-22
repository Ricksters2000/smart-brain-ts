import {AUTH_SUCCESS, AUTH_PENDING, AUTH_FAILED, SUBMIT_ENTRY, SIGNOUT} from '../actionTypes';
import type {User} from '../commonTypes';

export const NAME = 'auth';

// export type User = {
//     id: number | null,
//     name: number | null,
//     token: string | null
// }

export type AuthUser = {
    id: number,
    user?: User
}

export type AuthenticateUser = {
    type: typeof AUTH_SUCCESS | typeof AUTH_PENDING | typeof AUTH_FAILED,
    user: User
}

export type AuthFormState = {
    id: number,
    user?: User,
    err?: string
}

export type AuthUserActionType = {
    type: typeof AUTH_SUCCESS | typeof AUTH_PENDING | typeof AUTH_FAILED | typeof SUBMIT_ENTRY | typeof SIGNOUT,
    payload: AuthUser,
    err?: string
    
}