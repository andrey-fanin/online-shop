import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_API_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	localStorage: localStorage,
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: false
})

export default supabase
