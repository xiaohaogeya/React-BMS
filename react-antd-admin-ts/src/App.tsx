import React, {Component} from 'react';
import './App.css';
import {inject, observer} from "mobx-react";
import View from "./components/View";
import {AdminStore} from "./store/AdminStore";
import PermissionStore from "./store/PermissionStore";

interface IProps {
    adminStore?: AdminStore
    permissionStore?: PermissionStore
}
@inject('adminStore', 'permissionStore')
@observer
class App extends Component<IProps, any>{
    componentDidMount() {
        this.props.adminStore?.initAdmin()
        this.props.permissionStore?.initPermission()
    }

    render() {
        return (
            <div className="App">
                <View/>
            </div>
        );
    }
}


export default App;
