import {AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk';
import {RootState} from './rootReducer';

export type User = {
    name: string,
    email: string,
    entries: number,
    age?: number,
    image?: string,
    pet?: string,
    joined?: string
}

export type ThunkType<r=void> = ThunkAction<r, RootState, unknown, AnyAction>;