import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {Link, RouteComponentProps, withRouter, matchPath} from 'react-router-dom'
import router, {IRouter, leftRouter} from "../router";

const {SubMenu} = Menu;
const {Sider} = Layout;

interface IState {
    defaultOpenKeys: string[]
    defaultSelectedKeys: string[]
}

interface IProps extends RouteComponentProps {

}

class LeftBar extends Component<IProps, IState> {
    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            defaultOpenKeys: [],
            defaultSelectedKeys: []
        }
    }

    heightMenu = (leftRoutes: IRouter[]) => {
        let path = this.props.location.pathname
        // console.log(path)
        for (const route of leftRoutes) {
            let match = matchPath(path, {path: route.path})
            if (match) {
                if (match.isExact) {
                    // 精确匹配
                    this.setState(() => ({
                        defaultSelectedKeys: [route.key]
                    }))

                } else {
                    this.setState(() => ({
                        defaultOpenKeys: [route.key]
                    }))
                }
            }
            if (route.children) {
                this.heightMenu(route.children)
            }
        }
    }

    generateMenu = (routerList?: IRouter[]) => {
        return (
            routerList?.map(r => {
                if (r.children) {
                    return (
                        <SubMenu key={r.key} icon={r.icon} title={r.title}>
                            {this.generateMenu(r.children)}
                        </SubMenu>
                    )
                }
                return (
                    <Menu.Item key={r.key} icon={r.icon}>
                        <Link to={r.path}>{r.title}</Link>
                    </Menu.Item>
                )
            })
        )
    }

    componentDidMount() {
        this.heightMenu(leftRouter)
    }

    render() {
        return (
            <div>
                <Sider width={200} className="site-layout-background">
                    {
                        this.state.defaultSelectedKeys.length > 0
                            ? <Menu
                                mode="inline"
                                defaultSelectedKeys={this.state.defaultSelectedKeys}
                                defaultOpenKeys={this.state.defaultOpenKeys}
                                style={{height: '100%', borderRight: 0}}
                                theme={'light'}
                            >
                                {this.generateMenu(router)}
                            </Menu> :
                            null
                    }

                </Sider>
            </div>
        );
    }
}

export default withRouter(LeftBar);