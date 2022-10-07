import React, { useContext, useEffect, useState } from 'react'
import {
	Modal,
	Button,
	Form,
	Dropdown,
	Row,
	Col,
	Alert,
	CloseButton
} from 'react-bootstrap'
import { Context } from '../../index'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

const CreateDevice = observer(({ show, onHide }) => {
	const { device } = useContext(Context)
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
	}, [])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}
	const selectFile = e => {
		setFile(e.target.files[0])
	}

	const addDevice = async e => {
		e.preventDefault()
		if (
			name &&
			file &&
			price &&
			device.selectedBrand.name &&
			device.selectedType.id
		) {
			const formData = new FormData()
			formData.append('name', name)
			const fileName = `public/${name}.${file.name.split('.').pop()}`
			const imgPath = `${process.env.REACT_APP_API_URL}/storage/v1/object/public/online-shop/${fileName}`
			formData.append('price', `${price}`)
			formData.append('brandname', device.selectedBrand.name)
			formData.append('typeid', device.selectedType.id)
			setInfo(info.map(item => delete item.number))
			formData.append('img', imgPath)

			const entries = new Map([...formData])
			const obj = Object.fromEntries(entries)
			createDevice(obj, info, fileName, file).then(data => {
				if (data) onHide()
			})
			device.setSelectedType({})
			device.setSelectedBrand({})
		} else {
			alert('Fill in all the fields.')
		}
	}

	return (
		<Modal show={show} onHide={onHide} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add device</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>
							{device.selectedType.name || 'Select type'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.types.map(type => (
								<Dropdown.Item
									as={'option'}
									onClick={() => device.setSelectedType(type)}
									key={type.id}
								>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className="mt-2, mb-2">
						<Dropdown.Toggle>
							{device.selectedBrand.name || 'Select brand'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.brands.map(brand => (
								<Dropdown.Item
									onClick={() => device.setSelectedBrand(brand)}
									key={brand.name}
								>
									{brand.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className="mt-3"
						placeholder="Enter the name of device"
						type="text"
						validated="true"
						required={true}
					/>
					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className="mt-3"
						placeholder="Enter the price of device"
						type="number"
						required={true}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Enter the image of device"
						type="file"
						onChange={selectFile}
						required={true}
					/>
					<hr />
					<Button variant={'outline-dark'} onClick={addInfo}>
						Add new feature
					</Button>
					{info.map(i => (
						<Row className="mt-4" key={i.number}>
							<Col md={'auto'}>
								<Form.Control
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}
									placeholder="Enter the name of feature"
								/>
							</Col>
							<Col md={5}>
								<Form.Control
									value={i.description}
									onChange={e =>
										changeInfo('description', e.target.value, i.number)
									}
									placeholder="Enter the description of feature"
								/>
							</Col>
							<Col md={'auto'}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant={'outline-danger'}
								>
									Delete
								</Button>
							</Col>
						</Row>
					))}
					<Row
						className="flex-row flex-nowrap mt-3 justify-content-end"
						style={{ margin: 0 }}
					>
						<Button
							variant={'outline-danger'}
							className="w-auto"
							onClick={onHide}
						>
							Close
						</Button>
						<Button
							variant={'outline-success'}
							className="w-auto"
							style={{ marginLeft: 10 }}
							onClick={e => addDevice(e)}
							type="submit"
						>
							Add
						</Button>{' '}
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	)
})

export default CreateDevice
