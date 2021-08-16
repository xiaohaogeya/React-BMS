import React, {Component} from 'react';
import {roleList} from '../../api/role'
import {Button, Space, Table} from "antd";
import AddRole from "./AddRole";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";
import Auth from "../../components/Auth";


export interface IRole {
    id: number
    name: string
    permissions: number[]
}

interface IState {
    roleList: IRole[]
    current: number
    total: number
    loading: boolean
    showAddRoleModal: boolean
    showEditRoleModel: boolean
    role?: IRole
}

class RoleList extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            roleList: [],
            current: 1,
            total: 0,
            loading: true,
            showAddRoleModal: false,
            showEditRoleModel: false
        }
    }

    getRoleList = (page: number = 1) => {
        roleList({
            page
        }).then(res => {
            const {results, count} = res.data
            // console.log(results, count)

            this.setState(() => ({
                roleList: results,
                total: count,
                loading: false
            }))
        })
    }

    change = (pagination: any) => {
        this.getRoleList(pagination.current)
    }
    showAddRoleModal = () => {
        this.setState(() => ({
            showAddRoleModal: true
        }))
    }

    hideAddRoleModal = (refresh?: boolean) => {
        if (refresh) {
            this.getRoleList()
        }
        this.setState(() => ({
            showAddRoleModal: false
        }))
    }

    showEditRoleModal = (role: IRole) => {
        this.setState(() => ({
            role: role,
            showEditRoleModel: true
        }))
    }

    hideEditRoleModal = (refresh?: boolean) => {
        if (refresh) {
            this.getRoleList()
        }
        this.setState(() => ({
            showEditRoleModel: false
        }))
    }

    deleteRole = (id: number) => {
        this.setState(state => ({
            roleList: state.roleList.filter(role => role.id !== id)
        }))
    }

    componentDidMount() {
        this.getRoleList()
    }

    render() {
        return (
            <div>
                <EditRole visible={this.state.showEditRoleModel} role={this.state.role}
                          cancel={this.hideEditRoleModal}/>
                <Button type={'primary'} onClick={this.showAddRoleModal}>添加角色</Button>
                <AddRole visible={this.state.showAddRoleModal} callback={this.hideAddRoleModal}/>
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.roleList}
                    rowKey={'id'}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: 20,
                        total: this.state.total
                    }}
                    onChange={this.change}
                >
                    <Table.Column title={'ID'} dataIndex={'id'}/>
                    <Table.Column title={'角色名称'} dataIndex={'name'}/>
                    <Table.Column
                        title={'操作'}
                        render={(role: IRole) => (
                            <Space>
                                <Button type='primary' onClick={() => {
                                    this.showEditRoleModal(role)
                                }}>编辑</Button>
                                <Auth path={'deleteRole'}>
                                    <DeleteRole id={role.id} deleteRole={this.deleteRole}/>
                                </Auth>
                            </Space>
                        )}/>
                </Table>
            </div>
        );
    }
}

export default RoleList;