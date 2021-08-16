import React, {Component} from 'react';
import {Button, message, Popconfirm} from "antd";
import {deleteRole} from '../../api/role'

interface IProps {
    id: number
    deleteRole: (id: number) => void
}

class DeleteRole extends Component<IProps> {
    deleteRole = () => {
        deleteRole({id: this.props.id}).then(res => {
            message.info('删除成功')
            this.props.deleteRole(this.props.id)
        })
    }
    render() {
        return (
            <div>
                <Popconfirm
                    title='删除管理员'
                    onConfirm={this.deleteRole}
                    onCancel={() => message.info('取消删除')}
                    // cancelText={'取消'}
                    // okText={'确定'}
                >
                    <Button type='primary' danger>删除</Button>

                </Popconfirm>
            </div>
        );
    }
}

export default DeleteRole;