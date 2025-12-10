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

// Mock client for demo mode to prevent network errors
const createMockClient = () => {	
	const mockChain = {
		select: () => mockChain,
		insert: () => mockChain,
		update: () => mockChain,
		delete: () => mockChain,
		eq: () => mockChain,
		neq: () => mockChain,
		gt: () => mockChain,
		lt: () => mockChain,
		gte: () => mockChain,
		lte: () => mockChain,
		like: () => mockChain,
		ilike: () => mockChain,
		is: () => mockChain,
		in: () => mockChain,
		contains: () => mockChain,
		order: () => mockChain,
		limit: () => mockChain,
		single: () => Promise.resolve({ data: null, error: null }),
		maybeSingle: () => Promise.resolve({ data: null, error: null }),
		then: (resolve: any) => resolve({ data: [], error: null }),
	}

	const mockAuth = {
		getSession: () => Promise.resolve({ data: { session: null }, error: null }),
		onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
		signInWithPassword: () => Promise.resolve({ data: { user: { id: 'demo' }, session: { access_token: 'demo' } }, error: null }),
		signOut: () => Promise.resolve({ error: null }),
		getUser: () => Promise.resolve({ data: { user: null }, error: null }),
	}

	return {
		from: () => mockChain,
		auth: mockAuth,
		storage: {
			from: () => ({
				getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
				upload: () => Promise.resolve({ data: { path: 'demo' }, error: null }),
			}),
		},
		channel: () => ({
			on: () => ({ subscribe: () => {} }),
			subscribe: () => {},
			unsubscribe: () => {},
		}),
	} as unknown as ReturnType<typeof createClient<Database>>
}

export const supabase = DEMO_MODE 
	? createMockClient() 
	: createClient<Database>(url, key)
