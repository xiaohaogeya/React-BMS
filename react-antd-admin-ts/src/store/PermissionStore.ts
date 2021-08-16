import {action, makeAutoObservable, runInAction} from 'mobx'
import {IRouter} from "../router";
import {UserPermissions} from "../api/permission";


export default class PermissionStore {
    permissions: IRouter[] = []
    state: string = 'loading'

    constructor() {
        makeAutoObservable(this)
    }

    @action
    initPermission = async () => {
        const permissions = await UserPermissions().then(res => {
            return res.data.results
        })

        runInAction(() => {
            this.permissions = permissions
            this.state = 'success'
        })
    }

}

