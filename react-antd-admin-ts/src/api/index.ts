import axios from 'axios';
import config from '../config';
import localStorageUtils from '../utils/storage';
import {message, Modal} from 'antd';
import NProgress from 'nprogress'


message.config({
    duration: 2,
    maxCount: 3,
    rtl: false,
    top: 15
});

const service = axios.create({
    baseURL: config.url.API_BASE_URL,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        NProgress.start();
        const token = localStorageUtils.get()
        if (token) {
            config.headers['Authorization'] = 'jwt ' + localStorageUtils.get();

        }
        return config
    },
    error => {
        NProgress.done();
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        NProgress.done();

        const {code, msg} = response.data
        if (code && code !== '000000') {
            message.warning(msg)

        }
        return response;

    },
    error => {
        // console.log('拦截错误', error)
        if (error.response) {
            if (error.response.status in [500, 501, 502]) {
                Modal.error({
                    title: '网络请求错误'
                });
                NProgress.done();
            }

            if (error.response.status === 401) {
                // window.location.href = 'login/'
            }

        }
        return Promise.reject(error)
    }
)

// get
export const _get = (req: any) => {
    return service.get(req.url, {params: req.data});
};

// post
export const _post = (req: any) => {
    return service({method: 'post', url: `/${req.url}`, data: req.data});
};

// patch
export const _put = (req: any) => {
    return service({method: 'put', url: `/${req.url}`, data: req.data});
};

// delete
export const _delete = (req: any) => {
    return service({method: 'delete', url: `/${req.url}`, data: req.data});
};
