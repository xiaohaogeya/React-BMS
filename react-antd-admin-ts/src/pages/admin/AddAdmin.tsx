import React, {Component, createRef, RefObject} from 'react';
import {FormInstance, Modal, Form, Input, Button, message} from 'antd'
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
                                    message: '手机号不可为空'
                                }
                            ]}
                            label={'手机号'}
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
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button type="default" htmlType="reset">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default AddAdmin;