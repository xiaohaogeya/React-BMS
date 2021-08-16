import React, {Component, createRef, RefObject} from 'react';
import {FormInstance, Modal, Form, Input, Button, message, Space} from 'antd'
import {IAdmin} from "./AdminList";
import {addAdmin} from '../../api/user'

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

class AddAdmin extends Component<IProps> {
    formRef: RefObject<FormInstance>

    constructor(props: IProps, context: any) {
        super(props, context);
        this.formRef = createRef<FormInstance>()
    }

    cancel = () => {
        this.props.callback()
    }
    addAdmin = (admin: IAdmin) => {
        addAdmin(admin).then(res => {
            this.formRef.current?.resetFields();
            this.props.callback(true)
            message.info('添加成功')
        }).catch(err => {
            const {name} = err.response.data
            if (name) {
                message.error(name[0])
            }

        })
    }

    render() {
        return (
            <div>
                <Modal
                    title={'添加管理员'}
                    visible={this.props.visible}
                    onCancel={this.cancel}
                    footer={null}
                >
                    <Form
                        ref={this.formRef}
                        {...layout}

                        onFinish={this.addAdmin}
                    >
                        <Form.Item
                            name={'name'}
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: '用户名不可为空'
                                }
                            ]}
                            label={'用户名'}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={'mobile'}
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    validator: ((rule, value) => {
                                        if (value.length !== 11){
                                            return Promise.reject('手机号长度必须是11位')
                                        }
                                        if (!(/^1[3-9]\d{9}$/.test(value))){
                                            return Promise.reject('请输入正确的手机号')
                                        }
                                        return Promise.resolve()
                                    })
                                }
                            ]}
                            label={'手机号'}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={'email'}
                            rules={[
                                {
                                    type: 'string',
                                    validator: ((rule, value) => {
                                        if(value && !(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).test(value)){
                                            return Promise.reject('请输入正确的邮箱')
                                        }

                                        return Promise.resolve()
                                    })
                                }
                            ]}
                            label={'邮箱'}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={'password'}
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    // message: '密码不可为空',
                                    validator: ((rule, value) => {
                                        if (value.length < 6) {
                                            return Promise.reject('密码长度必须大于6位')
                                        }
                                        return Promise.resolve()
                                    })
                                }
                            ]}
                            label={'密码'}
                        >
                            <Input.Password/>
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

export default AddAdmin;