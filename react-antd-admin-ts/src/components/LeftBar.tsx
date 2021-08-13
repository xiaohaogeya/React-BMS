import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'
import router, {IRouter} from "../router";

const { SubMenu } = Menu;
const { Sider } = Layout;
class LeftBar extends Component {

    generateMenu = (routerList?: IRouter[]) => {
        return (
            routerList?.map(r => {
                if (r.children){
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

    render() {
        return (
            <div>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.generateMenu(router)}
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default LeftBar;