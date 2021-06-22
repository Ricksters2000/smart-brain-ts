import {User} from '../commonTypes'; 
import { fetchApi } from '../../services/api';
import { AxiosResponse } from 'axios';

export const getUser = (id: number): Promise<User> => {
    let user = {} as User

    return fetchApi('get', `/profile/${id}`)
        .then((data: any) => {
            user = {...user, name: data.name, email: data.email, age: data.age, entries: data.entries, pet: data.pet, joined: data.joined, image: data.image};
            return user;
        })
}

export const updateImage = (id: number, data: FormData): Promise<User | void> => {
    return fetchApi('post', `/profile/image/${id}`, data)
        .then((resp: any) => {
            return getUser(id);
        })
        .catch(console.log)
}

export const setTempImage = (data: FormData): Promise<string | void> => {
    return fetchApi('post', '/temp', data)
        .then((img: any) => {
            return img;
        }).catch(console.log)
}

export const updateUser = (id: number, data: FormData): Promise<void | AxiosResponse> => {
    return fetchApi('post', `/profile/${id}`, data)
        .then(resp => {
            return resp;
        }).catch(err => Promise.reject(err));
}