import {Component} from 'react';
import {Button, Space, Table} from "antd";
import {userList} from '../../api/user'
import DeleteAdmin from "./DeleteAdmin";

interface IAdmin {
    id: number
    name: string
    mobile: string
    email: string
}

interface IState {
    adminList: IAdmin[]
    current: number
    total: number
    loading: boolean
}

class AdminList extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            adminList: [],
            current: 1,
            total: 0,
            loading: true
        }
    }

    getUserList = (page: number = 1) => {
        userList({
            page
        }).then(res => {
            const {results, count} = res.data
            // console.log(results, count)

            this.setState(state => ({
                adminList: results,
                total: count,
                loading: false
            }))
        })

    }
    change = (pagination: any) => {
        this.getUserList(pagination.current)
    }
    deleteAdmin = (id: number) => {
        console.log('id-->', id)
        this.setState(state => ({
            adminList: state.adminList.filter(admin => admin.id !== id)
        }))
    }

    componentDidMount() {
        this.getUserList()
    }

    render() {
        return (
            <div>
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.adminList}
                    rowKey={'id'}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: 20,
                        total: this.state.total
                    }}
                    onChange={this.change}
                >
                    <Table.Column title={'ID'} dataIndex={'id'}/>
                    <Table.Column title={'用户名'} dataIndex={'name'}/>
                    <Table.Column title={'电话'} dataIndex={'mobile'}/>
                    <Table.Column title={'邮箱'} dataIndex={'email'}/>
                    <Table.Column
                        title={'操作'}
                        render={(admin: IAdmin) => (
                            <Space>
                                <Button type='primary'>编辑</Button>
                                <DeleteAdmin id={admin.id} deleteAdmin={this.deleteAdmin}/>
                            </Space>
                        )}/>
                </Table>

            </div>
        );
    }
}

export default AdminList;