import jwt_decode from 'jwt-decode'
import supabase from '../services/supabaseClient'

export const registration = async (email, password) => {
	const { user, session, error } = await supabase.auth.signUp({
		email: email,
		password: password
	})
	return user
}
export const login = async (email, password) => {
	const { user, session, error } = await supabase.auth.signIn({
		email,
		password
	})
	localStorage.setItem('token', session.access_token)
	return jwt_decode(session.access_token)
}
export const check = async () => {
	try {
		const session = supabase.auth.session()
		const data = localStorage.getItem('token')
		if (session?.access_token !== data) return
		return jwt_decode(data)
	} catch (e) {
		console.log(e)
	}
}
