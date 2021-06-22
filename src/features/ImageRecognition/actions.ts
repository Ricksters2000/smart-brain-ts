import {SET_IMAGE_LINK} from '../actionTypes';
import {submitEntry} from '../auth/actions';
import type {ImageLinkActionType} from './types'

export const setImageLink = (text: string): ImageLinkActionType => ({
    type: SET_IMAGE_LINK,
    payload: text
})