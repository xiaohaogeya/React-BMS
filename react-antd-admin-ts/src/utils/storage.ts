export default class LocalStorageUtils {
    static rm = (key: string = 'token') => {
        localStorage.removeItem(key)
    }

    static get = (key: string = 'token'): string | null => {
        return localStorage.getItem(key)
    }

    static set = (key: string = 'token', val: string) => {
        return localStorage.setItem(key, val)
    }

    static clear = () => {
        return localStorage.clear()
    }
}


