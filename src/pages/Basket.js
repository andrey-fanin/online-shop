import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import DeviceItem from '../components/DeviceItem'
import SadCat from '../assets/sadcat.jpg'
import { Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Button, Card } from 'react-bootstrap'
import Ucassa from '../services/Ucassa'

const Basket = observer(() => {
	const { basket } = useContext(Context)
	let sum = 0
	const increaseCount = item => {
		return item.count++
	}
	const decreaseCount = item => {
		if (item.count > 1) {
			return item.count--
		} else {
			basket.removeDevice(item)
		}
	}

	basket.devices.map(item => {
		sum += parseInt(item?.price * item?.count)
	})

	if (basket.devices.length) {
		return (
			<div
				className={
					'd-flex align-items-start justify-content-center mt-4 basket__container'
				}
			>
				<Row className={'d-flex flex-column align-items-center'}>
					{basket.devices.map(item => (
						<div style={{ position: 'relative', width: 'auto' }}>
							<DeviceItem key={item.id} item={item} />
							<Button
								onClick={() => basket.removeDevice(item)}
								style={{ position: 'absolute', top: 10, right: 0 }}
							>
								x
							</Button>
						</div>
					))}
				</Row>
				<Card className={'m-4 p-4'}>
					{basket.devices.map(item => (
						<div
							className="d-flex align-items-center justify-content-between mb-2"
							style={{ width: '100%' }}
						>
							<span style={{ width: '30%' }}>{item.name}</span>
							<span
								style={{ textAlign: 'right', width: '30%' }}
								className="d-flex justify-content-end"
							>
								{item.price} ₽
							</span>
							<span style={{ textAlign: 'right', width: 'auto' }}>
								<Button onClick={() => decreaseCount(item)}>-</Button>
								<span className="m-3">{item.count}</span>
								<Button onClick={() => increaseCount(item)}>+</Button>
							</span>
						</div>
					))}
					<span style={{ fontSize: 40 }}>sum: {sum} ₽</span>
					<Ucassa sum={sum} />
				</Card>
			</div>
		)
	} else {
		return (
			<div className={'d-flex align-items-center justify-content-center'}>
				<div style={{ textAlign: 'center' }}>
					<p style={{ fontSize: 32 }}>Shopping cart is empty.</p>
					<img alt="#" src={SadCat} />
				</div>
			</div>
		)
	}
})

export default Basket
