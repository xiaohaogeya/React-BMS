import React, {Component, createRef, RefObject} from 'react';
import {Button, Form, FormInstance, Input, message} from "antd";
import {login} from '../api/user'
import LocalStorageUtils from "../utils/storage";
import styles from '../assets/css/login.module.css'

class Login extends Component<any, any> {
    formRef: RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props, context);
        this.formRef = createRef<FormInstance>()
    }

    onFinish = async (values: any) => {
        const {username, password} = values
        try {
            const {data} = await login({username, password})
            console.log(data)
            const {results} = data
            if (results) {
                LocalStorageUtils.set('token', results.token)
                LocalStorageUtils.set('userId', results.user_id)
                window.location.href='/'
                message.info('登录成功')
            }
        }catch (e) {
            // console.log('e--->', e.response)
        }
    };


    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div className={styles.login}>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    ref={this.formRef}
                    className={styles.loginForm}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{required: true, message: '请输入您的用户名!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true, message: '请输入您的密码!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="reset">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;