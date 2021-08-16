import React, {Component, ReactNode} from 'react';
import PermissionStore from "../store/PermissionStore";
import {inject, observer} from "mobx-react";

interface IProps {
    path: string
    children?: ReactNode
    permissionStore?: PermissionStore
}

@inject('permissionStore')
@observer
class Auth extends Component<IProps> {
    render() {
        if(this.props.permissionStore){
            for (const permission of this.props.permissionStore.permissions) {
                if(permission.path === this.props.path){
                    return (
                        <>
                            {this.props.children}
                        </>
                    )
                }
            }
        }
        return null
    }
}

export default Auth;