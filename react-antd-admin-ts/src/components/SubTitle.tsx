import React, {Component, ReactNode, Fragment} from 'react';
import {Breadcrumb} from "antd";
import {IRouter, leftRouter} from "../router";
import {matchPath, RouteComponentProps, withRouter, Link} from "react-router-dom";

interface IProps extends RouteComponentProps {

}

class SubTitle extends Component<IProps> {
    generate = (routerList: IRouter[]): ReactNode => {
        let path = this.props.location.pathname
        return (
            <>
                {
                    routerList.map(router => {
                        let match = matchPath(path, {path: router.path})
                        if (match) {
                            return (
                                <Fragment key={router.key}>

                                    <Breadcrumb.Item key={router.key}>
                                        <Link to={router.path}>{router.title}</Link>
                                    </Breadcrumb.Item>

                                    {
                                        router.children ? this.generate(router.children) : null
                                    }

                                </Fragment>
                            )
                        }
                        return null
                    })
                }
            </>
        )
    }


    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    {this.generate(leftRouter)}
                </Breadcrumb>
            </div>
        );
    }
}

export default withRouter(SubTitle);