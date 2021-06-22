import type {AppDispatch} from '../../app/store';
import {fetchApi, setTokenHeader} from '../../services/api';
import {AUTH_SUCCESS, AUTH_PENDING, AUTH_FAILED, SUBMIT_ENTRY, SIGNOUT} from '../actionTypes';
import type {UserForm} from './components/AuthForm';
import type {AuthUserActionType, AuthenticateUser, AuthFormState, AuthUser} from './types';
import type {User, ThunkType} from '../commonTypes';

export const authenticateUser = (user: AuthUser): AuthUserActionType => ({
    type: AUTH_SUCCESS,
    payload: user
})

export const authenticateFailed = (err: string): AuthUserActionType => ({
    type: AUTH_FAILED,
    payload: {id: -1},
    err
})

// const pendingUser = (): AuthUserActionType => ({
//     type: AUTH_PENDING,
//     payload: null
// })

export const setToken = (token: string): void => {
    window.sessionStorage.setItem('token', token);
    setTokenHeader(token);
}

export const getUser = (id: number): Promise<User> => {
    return fetchApi('get', `/profile/${id}`)
        .then((data: any) => {
            return ({
                name: data.name, 
                email: data.email, 
                entries: data.entries, 
                age: data.age, joined: 
                data.joined, 
                image: data.image
            } as User)
        }).catch(err => Promise.reject(err))
}

export const registerUser = (user: UserForm): ThunkType<Promise<AuthUserActionType>> => (dispatch: AppDispatch): Promise<AuthUserActionType> => {
    // dispatch(pendingUser());
    return fetchApi('post', '/register', {name: user.name, email: user.email, password: user.password})
        .then((data: any) => {
            const {userId, token} = data;
            setToken(token);
            return getUser(userId)
                .then((u: User) => {
                    return dispatch(authenticateUser({id: userId, user: u}))
                }).catch(err => dispatch(authenticateFailed(err)))
        })
        .catch(err => dispatch(authenticateFailed(err)))
}

export const signinUser = (user={} as UserForm): ThunkType<Promise<AuthUserActionType>> => (dispatch: AppDispatch) => {
    // dispatch(pendingUser());
    return fetchApi('post', '/signin', {email: user.email, password: user.password})
        .then((data: any) => {
            const {userId, token} = data;
            if(token)
                setToken(token);
            return getUser(userId)
                .then((u: User) => {
                    return dispatch(authenticateUser({id: userId, user: u}))
                }).catch(err => dispatch(authenticateFailed(err)))
        })
        .catch(err => dispatch(authenticateFailed(err)))
}

export const signoutUser = (): AuthUserActionType => ({
    type: SIGNOUT,
    payload: {id: -1}
})

export const submitEntry = (id: number): ThunkType<Promise<AuthUserActionType>> => (dispatch: AppDispatch): Promise<AuthUserActionType> => {
    return fetchApi('put', '/image', {id})
        .then((data: any) => {
            return dispatch({
                type: SUBMIT_ENTRY,
                payload: {id, user: {entries: data}}
            } as AuthUserActionType)
        })
}