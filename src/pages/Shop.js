import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { Context } from '../index'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import Pages from '../components/Pages'

const Shop = observer(() => {
	const { device } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
		fetchDevices(null, null, 3, 1)
			.then(data => {
				device.setDevices(data.data)
				device.setTotalCount(data.count)
			})
			.finally(() => setLoading(false))
	}, [])

	useEffect(() => {
		fetchDevices(
			device.selectedBrand.name,
			device.selectedType.id,
			3,
			device.page
		).then(data => {
			device.setDevices(data.data)
			device.setTotalCount(data.count)
		})
	}, [device.page, device.selectedType, device.selectedBrand])

	// useEffect( () => {
	// 	fetchTypes().then(data => device.setTypes(data))
	// 	fetchBrands().then(data => device.setBrands(data))
	// 	fetchDevices(null, null, 9, 1).then(data => {
	// 		device.setDevices(data.rows)
	// 		device.setTotalCount(data.count)
	// 	})
	// }, [])
	//
	// useEffect( () => {
	// 	fetchDevices( device.selectedBrand.id, device.selectedType.id,  9, device.page).then(data => {
	// 		device.setDevices(data.rows)
	// 		device.setTotalCount(data.count)
	// 	}).finally(() => setLoading(false))
	//
	// }, [device.page, device.selectedType, device.selectedBrand])

	if (loading) {
		return (
			<div className={'text-center'}>
				<Spinner animation={'grow'} />
			</div>
		)
	}
	return (
		<Container>
			<Row className="mt-2">
				<Col md={3}>
					<TypeBar />
				</Col>
				<Spinner animation={'grow'} hidden={!loading} />
				<Col md={9} hidden={loading}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	)
})

export default Shop
