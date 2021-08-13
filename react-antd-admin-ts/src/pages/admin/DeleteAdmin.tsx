import React, {Component} from 'react';
import {Button, Popconfirm, message} from 'antd'
import {deleteUser} from '../../api/user'

interface IProps {
    id: number
    deleteAdmin: (id: number) => void
}

class DeleteAdmin extends Component<IProps> {
    deleteAdmin = () => {
        // console.log(this.props)
        deleteUser({id: this.props.id}).then(res => {
            // console.log(res)
            message.info('删除成功')
            this.props.deleteAdmin(this.props.id)
        })
    }

    render() {
        return (
            <div>
                <Popconfirm
                    title='删除管理员'
                    onConfirm={this.deleteAdmin}
                    onCancel={() => message.info('取消删除')}
                >
                    <Button type='primary' danger>删除</Button>

                </Popconfirm>
            </div>
        );
    }
}

export default DeleteAdmin;