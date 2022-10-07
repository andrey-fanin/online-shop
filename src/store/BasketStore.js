import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor() {
        this._brands = []
        this._devices = JSON.parse(localStorage.getItem('basket_devices')) || []
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevice(device) {
        const isDeviceInCard = this._devices.filter(i => i.id === device.id)

        if (!isDeviceInCard.length) {
            this._devices.push(device)
            localStorage.setItem('basket_devices', JSON.stringify(this._devices))
        }
    }
    removeDevice(device) {
        this._devices = this._devices.filter(i => i.id !== device.id)
        localStorage.setItem('basket_devices', JSON.stringify(this._devices))
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

}