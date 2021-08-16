import {action, makeAutoObservable, observable, runInAction} from "mobx";
import LocalStorageUtils from "../utils/storage";
import {userInfo} from "../api/user";

interface IAdmin {
    id: number
    name: string
    avatar: string
}

export class AdminStore {
    @observable
    public admin: IAdmin = {id: 0, name: '', avatar: ''}

    constructor(admin: IAdmin = {id: 0, name: 'admin', avatar: ''}) {
        this.admin = admin;
        makeAutoObservable(this)
    }

    @action
    logout = () => {
        this.admin = {id: 0, name: '', avatar: ''}
        LocalStorageUtils.clear()
    }
    @action
    login = (token: string) => {
        LocalStorageUtils.set('token', token)
    }
    @action
    initAdmin = async () => {
        const admin = await userInfo().then(response => {
            return response.data.results
        })
        runInAction(() => {
            this.admin = admin
        })
    }
}
