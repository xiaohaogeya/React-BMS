import React, {Component, createRef, RefObject} from 'react';
import {Button, Form, FormInstance, Input, message, Modal, Space, Tree} from "antd";
import {IRole} from "./RoleList";
import {permissionTree} from "../../api/permission";
import {updateRole} from '../../api/role'

interface IProps {
    visible: boolean
    role?: IRole
    cancel: (refresh?: boolean) => void
}

interface IPermission {
    id: number
    title: string
    parent: number
    children: IPermission[]
    path: string
    key: number
}

interface IState {
    nodeList: IPermission[]
    defaultCheckedKeys: number[]
}

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class EditRole extends Component<IProps, IState> {
    formRef: RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            nodeList: [],
            defaultCheckedKeys: []
        }
        this.formRef = createRef<FormInstance>()

    }

    onCheck = (checkedKeys: any) => {
        this.formRef.current?.setFieldsValue({permissions: checkedKeys.checked})
    }

    onCancel = () => {
        this.setState(()=>({
            nodeList: [],
            defaultCheckedKeys: []
        }))
        this.props.cancel()
    }

    getPermissionTree = () => {
        permissionTree().then(res => {
            const {results} = res.data
            this.setState(() => ({
                nodeList: results
            }))
        })
    }

    updateRole = (role: any) => {
        role.id = this.props.role?.id
        updateRole(role).then(res => {
            message.info('修改成功')
            this.props.cancel(true)
        })
    }
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        const {role} = this.props
        if (!prevProps.visible && role?.id && prevState.nodeList.length === 0) {
            // console.log(role)
            this.getPermissionTree()
            this.formRef.current?.setFieldsValue({
                permissions: role.permissions
            })
            this.setState(() => ({
                defaultCheckedKeys: role.permissions
            }))
        }
    }

    render() {
        this.formRef.current?.setFieldsValue({...this.props.role})
        return (
            <div>
                <Modal
                    title={'编辑角色'}
                    visible={this.props.visible}
                    footer={null}
                    onCancel={this.onCancel}
                >
                    <Form
                        {...layout}
                        ref={this.formRef}
                        onFinish={this.updateRole}
                    >
                        <Form.Item
                            name={'name'}
                            label={'角色名称'}
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    validator: ((rule, value) => {
                                        if (value === undefined || value === null) {
                                            return Promise.reject('角色名称不可为空')
                                        }
                                        if (value.length < 2) {
                                            return Promise.reject('角色名称长度不能小于2位')
                                        }
                                        return Promise.resolve()
                                    })
                                }
                            ]}
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}

                        >
                            <Input/>
                        </Form.Item>
                        {
                            this.state.nodeList.length ? (
                                <Form.Item
                                    label={'权限'}
                                    name='permissions'
                                    rules={[
                                        {
                                            type: "array",
                                            min: 1,
                                            required: true,
                                            validator: (rule, value) => {
                                                if (value === undefined || value.length < 1) {
                                                    return Promise.reject('至少要选择一个权限！')
                                                }
                                                return Promise.resolve()
                                            }
                                        },
                                    ]}
                                    shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}

                                >
                                    <Tree
                                        checkable
                                        defaultExpandAll
                                        checkStrictly
                                        showLine
                                        treeData={this.state.nodeList}
                                        onCheck={this.onCheck}
                                        defaultCheckedKeys={this.state.defaultCheckedKeys}

                                    />
                                </Form.Item>
                            ) : null
                        }


                        <Form.Item {...tailLayout}>
                            <Space size={'middle'}>

                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                                <Button type="default" htmlType="reset">
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        );
    }
}

export default EditRole;