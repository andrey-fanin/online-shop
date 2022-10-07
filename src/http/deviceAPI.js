import supabase from '../services/supabaseClient'

export const createType = async type => {
	const { data, error } = await supabase.from('types').insert([{ ...type }])
	if (error) alert(error.details)
	return data
}
export const fetchTypes = async () => {
	try {
		const { data } = await supabase.from('types').select('*')
		return data
	} catch (e) {
		alert(e)
	}
}

export const createBrand = async brand => {
	const { data, error } = await supabase.from('brands').insert([{ ...brand }])
	if (error) alert(error.details)
	return data
}
export const fetchBrands = async () => {
	try {
		const { data } = await supabase.from('brands').select('*')
		return data
	} catch (e) {
		alert(e)
	}
}

export const createDevice = async (device, device_info, fileName, file) => {
	try {
		const { data, error } = await supabase
			.from('devices')
			.insert([{ ...device }])
		console.log(error)
		if (error?.details) return alert(error.details)
		device_info.map(item => (item.deviceid = data[0].id))
		const { info, infoError } = await supabase
			.from('devices_info')
			.insert([...device_info])
		const { img, imgError } = await supabase.storage
			.from('online-shop')
			.upload(fileName, file)
		return data
	} catch (e) {
		alert(e)
	}
}
export const fetchDevices = async (brandname, typeid, limit = 4, page) => {
	try {
		page = page || 1
		limit = limit || 4
		let offset = page * limit - limit
		if (page > 1) offset = offset + page - 1

		let query = supabase
			.from('devices')
			.select('*', { count: 'estimated' })
			.range(offset, offset + limit)

		if (brandname) {
			query = query.eq('brandname', brandname)
		}
		if (typeid) {
			query = query.eq('typeid', typeid)
		}

		const { data, count } = await query
		return { data, count }
	} catch (e) {
		alert(e)
	}
}
export const fetchOneDevice = async id => {
	try {
		const { data } = await supabase
			.from('devices')
			.select('*')
			.match({ id: id })
		const info = await fetchDeviceInfo(id)

		return { ...data[0], info }
	} catch (e) {
		alert(e)
	}
}

export const fetchDeviceInfo = async id => {
	const { data } = await supabase
		.from('devices_info')
		.select('*')
		.match({ deviceid: id })
	return data
}
