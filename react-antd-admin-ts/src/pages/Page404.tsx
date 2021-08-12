import React, {Component} from 'react';
import {Button, Result} from "antd";

class Page404 extends Component {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </div>
        );
    }
}

export default Page404;