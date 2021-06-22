import {SET_IMAGE_LINK} from '../actionTypes';
import type {ImageLinkActionType, ImageFormState} from './types';

const initialState: ImageFormState = {
    link: ''
}

export default (state=initialState, action: ImageLinkActionType): ImageFormState => {
    switch(action.type) {
        case SET_IMAGE_LINK:
            return {...state, link: action.payload};
        default:
            return state;
    }
}