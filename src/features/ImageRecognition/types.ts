export const NAME = 'IMAGE_RECOGNITION';

export type ImageLinkActionType = {
    type: string,
    payload: string
}

export interface ImageFormState{
    link: string
}