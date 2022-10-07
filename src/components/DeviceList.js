import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import DeviceItem from './DeviceItem'
import { Row } from 'react-bootstrap'
import ImgEmpty from '../assets/ImgEmpty.jpg'

const DeviceList = observer(() => {
	const { device } = useContext(Context)

	if (device.devices.length) {
		return (
			<Row className="d-flex">
				{device.devices.map(item => (
					<DeviceItem key={item.id} item={item} />
				))}
			</Row>
		)
	} else {
		return (
			<div className={'d-flex'}>
				<div style={{ textAlign: 'center' }}>
					<p style={{ fontSize: 32 }}>Nothing to show.</p>
					<img alt="#" src={ImgEmpty} />
				</div>
			</div>
		)
	}
})

export default DeviceList
