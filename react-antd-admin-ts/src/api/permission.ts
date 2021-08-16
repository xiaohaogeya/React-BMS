import { _get } from './index';

// 获取权限树状结构数据
export const permissionTree = (data: object={}) => {
    const req = {
        data,
        url: 'permission_tree/'
    }
    return _get(req)
}

// 获取用户权限
export const UserPermissions = (data:object={}) => {
    const req = {
        data,
        url: 'query_user_permissions/'
    }
    return _get(req)
}