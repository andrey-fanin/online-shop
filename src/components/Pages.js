import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Pagination } from 'react-bootstrap'

const Pages = observer(() => {
	const { device } = useContext(Context)
	let pageCount = Math.ceil(device.totalCount / device.limit)
	const pages = []

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}

	if (pages.length > 1) {
		return (
			<Pagination className={'mt-5'}>
				{pages.map(page => (
					<Pagination.Item
						key={page}
						active={device.page === page}
						activeLabel=""
						onClick={() => device.setPage(page)}
						style={{ cursor: 'pointer' }}
					>
						{page}
					</Pagination.Item>
				))}
			</Pagination>
		)
	} else {
		return null
	}
})

export default Pages
