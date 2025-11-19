import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { DEMO_MODE } from './demoMode'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// In demo mode, use dummy credentials
if (!DEMO_MODE && (!supabaseUrl || !supabaseAnonKey)) {
	throw new Error('Missing Supabase environment variables. Set VITE_DEMO_MODE=true for demo mode.')
}

// Use dummy values in demo mode to prevent errors
const url = supabaseUrl || 'https://dummy.supabase.co'
const key = supabaseAnonKey || 'dummy-key'

export const supabase = createClient<Database>(url, key)
