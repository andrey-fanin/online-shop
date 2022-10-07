import React, { useContext, useEffect, useState } from 'react'
import {
	Container,
	Col,
	Image,
	Row,
	Card,
	Button,
	Spinner,
	Alert
} from 'react-bootstrap'
import ImgStar from '../assets/ImgStar.png'
import { useHistory, useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'
import { Context } from '../index'
import { LOGIN_ROUTE } from '../utils/consts'

const DevicePage = () => {
	const [device, setDevice] = useState({ info: [] })
	const { id } = useParams()
	const { basket, user } = useContext(Context)
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	let [count, setCount] = useState(1)

	useEffect(() => {
		fetchOneDevice(id)
			.then(data => setDevice(data))
			.finally(() => setLoading(false))
	}, [])

	const increaseCount = () => {
		return setCount(count + 1)
	}
	const decreaseCount = () => {
		if (count > 1) return setCount(count - 1)
	}

	if (loading) {
		return (
			<Container className="mt-3 d-flex align-items-center justify-content-center align-items-center">
				<Spinner animation={'grow'} className={'text-align-center'} />
			</Container>
		)
	}

	return (
		<Container className="mt-3">
			<Row>
				<Col md={4} className={'d-flex text-center justify-content-center'}>
					<Image width={300} height={300} src={device.img} />
				</Col>
				<Col
					md={4}
					className={'d-flex text-center justify-content-center mt-3'}
				>
					<Row className="d-flex flex-column align-items-start">
						<h2>{device.name}</h2>
						<h3>{device.brandname}</h3>
						<div
							className="d-flex align-items-center justify-content-center"
							style={{
								background: `url(${ImgStar}) no-repeat center center`,
								backgroundSize: 'cover',
								width: 200,
								height: 200,
								fontSize: 64
							}}
						>
							{device.rating}
						</div>
					</Row>
				</Col>
				<Col
					md={4}
					className={'d-flex text-center justify-content-center mt-3 pb-3'}
				>
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{
							width: 300,
							height: 300,
							fontSize: 32,
							border: '5px solid lightgray'
						}}
					>
						<h3>From: {device.price} ₽</h3>
						{user.isAuth ? (
							<>
								<div
									className="d-flex align-items-center justify-content-between"
									style={{ width: '50%' }}
								>
									<Button
										onClick={() => decreaseCount()}
										disabled={count === 1}
									>
										-
									</Button>
									<span style={{ width: '30%', textAlign: 'center' }}>
										{count}
									</span>
									<Button onClick={() => increaseCount()}>+</Button>
								</div>
								<Button
									variant={'outline-dark'}
									onClick={() => basket.setDevice({ ...device, count })}
								>
									Add to cart
								</Button>
							</>
						) : (
							<Alert
								variant={'primary'}
								className={'text-center d-flex flex-column'}
								style={{ fontSize: '14px' }}
							>
								Shopping is open for logged users only.
								<Alert.Link
									className="Link"
									onClick={() => history.push(LOGIN_ROUTE)}
								>
									Sign in!
								</Alert.Link>
							</Alert>
						)}
					</Card>
				</Col>
				{/*<Col md={4}></Col>*/}
			</Row>
			<Row className="d-flex flex-column m-3">
				<h1>Features</h1>
				{device.info?.map((info, index) => (
					<div
						className="p-1 d-flex"
						key={info.id}
						style={{
							background: index % 2 === 0 ? 'lightgray' : 'transparent'
						}}
					>
						<span style={{ minWidth: 200, paddingLeft: 10 }}>{info.title}</span>
						<span>{info.description}</span>
					</div>
				))}
			</Row>
		</Container>
	)
}

export default DevicePage
