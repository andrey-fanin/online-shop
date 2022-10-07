import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	LOGIN_ROUTE,
	SHOP_ROUTE
} from '../utils/consts'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ReactComponent as SvgCart } from '../assets/SvgCart.svg'
import { ReactComponent as SvgProfile } from '../assets/SvgProfile.svg'
import { ReactComponent as SvgLogout } from '../assets/SvgLogout.svg'
import { ReactComponent as SvgSignIn } from '../assets/SvgSignIn.svg'
import supabase from '../services/supabaseClient'

const NavBar = observer(() => {
	const { user, basket } = useContext(Context)
	const history = useHistory()
	const logOut = async () => {
		const { error } = await supabase.auth.signOut()
		user.setIsAuth(false)
		localStorage.removeItem('token')
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
					OnlineShop
				</NavLink>
				{user.isAuth ? (
					<Nav
						className="ml-auto justify-content-between"
						style={{ color: 'white' }}
					>
						<Button
							variant={'outline-secondary'}
							onClick={() => history.push(BASKET_ROUTE)}
							style={{ marginRight: '10px', height: 38 }}
							className="d-flex align-items-center justify-content-center"
						>
							<SvgCart
								style={{
									width: 20,
									height: 'auto',
									fill: 'white'
								}}
							/>
							<span>
								{basket.devices?.length > 0
									? ` (${basket.devices.length})`
									: null}
							</span>
						</Button>
						<Button
							variant={'outline-secondary'}
							onClick={() => history.push(ADMIN_ROUTE)}
							style={{ marginRight: '10px', height: 38 }}
							className="d-flex align-items-center justify-content-center"
						>
							<SvgProfile
								style={{
									width: 20,
									height: 'auto',
									fill: 'white'
								}}
							/>
						</Button>
						<Button
							variant={'outline-secondary'}
							style={{ height: 38 }}
							onClick={logOut}
							className="d-flex align-items-center justify-content-center"
						>
							<SvgLogout
								style={{
									width: 20,
									height: 'auto',
									fill: 'white',
									transform: 'translateX(3px)'
								}}
							/>
						</Button>
					</Nav>
				) : (
					<Nav className="ml-auto" style={{ color: 'white' }}>
						<Button
							variant={'outline-secondary'}
							onClick={() => history.push(LOGIN_ROUTE)}
							style={{ height: 38 }}
							className="d-flex align-items-center justify-content-center"
						>
							<SvgSignIn
								style={{
									width: 20,
									height: 'auto',
									fill: 'white'
								}}
							/>
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
