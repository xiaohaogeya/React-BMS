import React, {Component, createRef, RefObject} from 'react';
import {Form, Modal, Input, Space, Button, Tree, FormInstance, message} from "antd";
import {permissionTree} from '../../api/permission'
import {addRole} from '../../api/role'


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IProps {
    visible: boolean
    callback: (refresh?: boolean) => void
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
}

class AddRole extends Component<IProps, IState> {
    formRef: RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            nodeList: []
        }
        this.formRef = createRef<FormInstance>()

    }

    cancel = () => {
        this.props.callback()
    }
    onCheck = (checkedKeys: any) => {
        // console.log(checkedKeys)
        this.formRef.current?.setFieldsValue({permissions: checkedKeys.checked})
    }
    addRole = (form: any) => {
        console.log(form)
        addRole(form).then(res => {
            message.info('添加成功')
            this.props.callback(true)
            this.formRef.current?.resetFields();
        })
    }

    getPermissionTree = () => {
        permissionTree().then(res => {
            const {results} = res.data
            this.setState(() => ({
                nodeList: results
            }))
        })
    }

    componentDidMount() {
        this.getPermissionTree()
    }

    render() {
        return (
            <div>
                <Modal
                    title={'添加角色'}
                    visible={this.props.visible}
                    onCancel={this.cancel}
                    footer={null}
                >
                    <Form
                        {...layout}
                        ref={this.formRef}
                        initialValues={{
                            name: '',

                            permissions: []
                        }}
                        onFinish={this.addRole}
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
                        >
                            <Input/>
                        </Form.Item>

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
                        >
                            <Tree
                                checkable
                                defaultExpandAll
                                checkStrictly
                                showLine
                                treeData={this.state.nodeList}
                                onCheck={this.onCheck}

                            />
                        </Form.Item>

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

export default AddRole;