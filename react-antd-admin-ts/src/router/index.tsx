import React, {ReactNode, lazy} from "react";
import { UserOutlined,  DashboardOutlined } from '@ant-design/icons';
const Dashboard = lazy(()=> import('../pages/index/Dashboard'))
const Login = lazy(()=> import('../pages/Login'))
const Page404 = lazy(()=> import('../pages/Page404'))
const UserList = lazy(()=> import('../pages/user/UserList'))
const AdminList = lazy(()=> import('../pages/admin/AdminList'))

export interface IRouter {
    title: string
    path: string
    key: string
    exact?: boolean
    icon?: ReactNode
    component?: ReactNode
    children?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/dashboard',
        title: '仪表盘',
        key: 'dashboard',
        exact: true,
        icon: <DashboardOutlined />,
        component: <Dashboard/>
    },
    {
        path: '/user',
        title: '用户管理',
        key: 'user',
        icon: <UserOutlined/>,
        children: [
            {
                path: '/user/list',
                title: '用户列表',
                key: 'userList',
                icon: <UserOutlined/>,
                component: <UserList/>
            }
        ]
    },
    {
        path: '/admin',
        title: '管理员管理',
        key: 'admin',
        icon: <UserOutlined/>,
        children: [
            {
                path: '/admin/list',
                title: '管理员列表',
                key: 'adminList',
                icon: <UserOutlined/>,
                component: <AdminList/>
            }
        ]
    }
]

export const unAuthRouter: IRouter[] = [
    {
        path: '/login',
        title: '登录',
        key: 'login',
        component: <Login/>
    },
    {
        path: '*',
        title: '404',
        key: '404',
        component: <Page404/>
    },
]

export default router
