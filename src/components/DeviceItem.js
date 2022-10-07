import React, { useContext } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import SvgStar from '../assets/SvgStar'
import { useHistory, useLocation } from 'react-router-dom'
import { BASKET_ROUTE, DEVICE_ROUTE } from '../utils/consts'
import { Context } from '../index'
import noImg from '../assets/noImg.png'

const DeviceItem = ({ item }) => {
	const history = useHistory()
	const { device } = useContext(Context)

	return (
		<Col
			md={3}
			className="mt-3"
			onClick={() => history.push(`${DEVICE_ROUTE}/${item.id}`)}
		>
			<Card
				style={{ width: 150, cursor: 'pointer' }}
				border={'light'}
				className="device__card"
			>
				<Card border={'light'} style={{ padding: '5px' }}>
					<div
						style={{ width: 150, height: 150 }}
						className="d-flex align-items-center"
					>
						<Image
							style={{
								display: 'block',
								maxWidth: '100%'
							}}
							src={item?.img || noImg}
						/>
					</div>
					<div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
						<div className="">{item?.brandname}</div>
						<div className="d-flex align-items-center">
							<div style={{ paddingRight: '5px' }}>{item?.rating}</div>
							<SvgStar />
						</div>
					</div>
					<div className="">{item?.name}</div>
					<div className="">{item?.price} ₽</div>
				</Card>
			</Card>
		</Col>
	)
}

export default DeviceItem
