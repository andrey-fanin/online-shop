import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
	constructor() {
		this._types = []
		this._brands = []
		this._devices = []
		this._selectedType = {}
		this._selectedBrand = {}
		this._page = 1
		this._totalCount = 0
		this._limit = 4
		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}

	setBrands(brands) {
		this._brands = brands
	}

	setDevices(devices) {
		this._devices = devices
	}

	setSelectedType(type) {
		this.setPage(1)

		if (type === this._selectedType) {
			this._selectedType = {}
		} else {
			this._selectedType = type
		}
	}

	setSelectedBrand(brand) {
		this.setPage(1)

		if (brand === this._selectedBrand) {
			this._selectedBrand = {}
		} else {
			this._selectedBrand = brand
		}
	}
	setTotalCount(count) {
		this._totalCount = count
	}
	setPage(page) {
		this._page = page
	}

	get types() {
		return this._types
	}
	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}

	get selectedType() {
		return this._selectedType
	}
	get selectedBrand() {
		return this._selectedBrand
	}
	get totalCount() {
		return this._totalCount
	}
	get page() {
		return this._page
	}
	get limit() {
		return this._limit
	}
}
