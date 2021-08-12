import React, {ReactNode, lazy} from "react";

const Dashboard = lazy(()=> import('../pages/index/Dashboard'))
const Login = lazy(()=> import('../pages/Login'))
const Page404 = lazy(()=> import('../pages/Page404'))

interface IRouter {
    title: string
    path: string
    key: string
    exact?: boolean
    component?: ReactNode
    children?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/',
        title: '仪表盘',
        key: 'dashboard',
        exact: true,
        component: <Dashboard/>
    },
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