import { _post, _get, _delete } from './index';

// 登录
export const login = (data: object) => {
    const req = {
        data,
        url: 'login/',
    };
    return _post(req);
};

// 用户列表
export const userList = (data: object={}) => {
    const req = {
        data,
        url: 'user/'
    }
    return _get(req)
}

// 删除用户
export const deleteUser = (data: any) => {
    const req = {
        data:{},
        url: `user/${data.id}`
    }
    return _delete(req)
}

// 添加管理员
export const addAdmin = (data: any) => {
    const req = {
        data,
        url: 'user/'
    }
    return _post(req)
}
