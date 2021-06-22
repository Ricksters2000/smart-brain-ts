import axios, { AxiosPromise, Method } from 'axios';

export const API_URL = process.env.REACT_APP_REST_API;

axios.defaults.baseURL = API_URL;

export function setTokenHeader(token: string | boolean): void {
    if (token) {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

/**
 * A wrapper around axios that formats errors, etc.
 * @param {string} method - the HTTP verb you want to use
 * @param {string} path - the route path/endpoint
 * @param {object} data - (optional) data in JSON form for POST requests
 */
export const fetchApi = (method: Method, url: string, data?: any): AxiosPromise<unknown> => {
    console.log('fetching:', method, url, data);
    return new Promise((resolve, reject) => {
        return axios.request({method, url, data})
            .then((res: any) => {
                return resolve(res.data);
            })
            .catch((err: any): any => {
                // console.log(err.response.data.error)
                return reject(err.response.data.toString());
            })
    });
}