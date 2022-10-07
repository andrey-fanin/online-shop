import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import './styles/styles.scss'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			check()
				.then(data => {
					if (data) {
						user.setUser(true)
						user.setIsAuth(true)
					}
				})
				.finally(() => setLoading(false))
		}, 1000)
	}, [])

	if (loading) {
		return (
			<div className={'text-center'}>
				<Spinner animation={'grow'} />
			</div>
		)
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
})
export default App
