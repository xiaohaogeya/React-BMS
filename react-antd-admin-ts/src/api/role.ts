import {_delete, _get, _post, _put} from "./index";

// 角色列表
export const roleList = (data: object={}) => {
    const req = {
        data,
        url: 'role/'
    }
    return _get(req)
}


// 添加角色
export const addRole = (data:any) => {
    const req = {
        data,
        url: 'role/'
    }
    return _post(req)
}

// 删除角色
export const deleteRole = (data:any) => {
    const req = {
        data:{},
        url: 'role/' + data.id + '/'
    }
    return _delete(req)
}

// 更新角色
export const updateRole = (data:any) => {
    const req = {
        data,
        url: 'role/' + data.id + '/'
    }
    return _put(req)
}