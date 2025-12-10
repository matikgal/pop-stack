// TMDB API Service - Filmy i Seriale
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export interface TMDBMovie {
	id: number
	title?: string
	name?: string // dla TV shows
	poster_path: string | null
	backdrop_path: string | null
	overview: string
	vote_average: number
	release_date?: string
	first_air_date?: string
	media_type?: 'movie' | 'tv'
	genre_ids: number[]
}

export interface TMDBResponse {
	page: number
	results: TMDBMovie[]
	total_pages: number
	total_results: number
}

// Helper do tworzenia URL obrazków
export const getTMDBImageUrl = (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500') => {
	if (!path) return 'https://via.placeholder.com/500x750?text=No+Image'
	return `${TMDB_IMAGE_BASE}/${size}${path}`
}

// Fetch helper z error handling
const tmdbFetch = async <T>(endpoint: string): Promise<T> => {
	// Demo mode support
	if (import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.VITE_DEMO_MODE === true) {
		
		// Simulate network delay
		await new Promise(resolve => setTimeout(resolve, 500))
		
		// Return appropriate mock data based on endpoint
		if (endpoint.includes('trending')) {
			const { DEMO_MOVIES, DEMO_SERIES } = await import('../lib/demoMode')
			const movies = DEMO_MOVIES.map(m => ({
				id: m.movie_id,
				title: m.movie_title,
				poster_path: m.movie_poster,
				vote_average: m.rating,
				overview: m.review_text || 'Demo movie overview',
				release_date: m.watched_date,
				genre_ids: [28, 12],
				backdrop_path: m.movie_poster,
				media_type: 'movie',
			}))
			const series = DEMO_SERIES.map(s => ({
				id: s.series_id,
				name: s.series_title,
				poster_path: s.series_poster,
				vote_average: s.rating,
				overview: s.review_text || 'Demo series overview',
				first_air_date: s.watched_date,
				genre_ids: [18, 10765],
				backdrop_path: s.series_poster,
				media_type: 'tv',
			}))

			return {
				page: 1,
				results: [...movies, ...series],
				total_pages: 1,
				total_results: movies.length + series.length
			} as unknown as T
		}

		if (endpoint.includes('movie')) {
			const { DEMO_MOVIES } = await import('../lib/demoMode')
			// Mapping demo movies to TMDB format
			const results = DEMO_MOVIES.map(m => ({
				id: m.movie_id,
				title: m.movie_title,
				poster_path: m.movie_poster,
				vote_average: m.rating,
				overview: m.review_text || 'Demo movie overview',
				release_date: m.watched_date,
				genre_ids: [28, 12],
				backdrop_path: m.movie_poster,
			})) as unknown as TMDBMovie[]

			if (endpoint.includes('details') || endpoint.match(/\/movie\/\d+$/)) {
				return results[0] as unknown as T
			}

			return {
				page: 1,
				results: results,
				total_pages: 1,
				total_results: results.length
			} as unknown as T
		} 
		
		if (endpoint.includes('tv')) {
			const { DEMO_SERIES } = await import('../lib/demoMode')
			const results = DEMO_SERIES.map(s => ({
				id: s.series_id,
				name: s.series_title,
				poster_path: s.series_poster,
				vote_average: s.rating,
				overview: s.review_text || 'Demo series overview',
				first_air_date: s.watched_date,
				genre_ids: [18, 10765],
				backdrop_path: s.series_poster,
			})) as unknown as TMDBMovie[]

			if (endpoint.match(/\/tv\/\d+$/)) {
				return results[0] as unknown as T
			}

			return {
				page: 1,
				results: results,
				total_pages: 1,
				total_results: results.length
			} as unknown as T
		}
		
		return {
			page: 1,
			results: [],
			total_pages: 1,
			total_results: 0
		} as unknown as T
	}

	try {
		const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
			headers: {
				Authorization: `Bearer ${TMDB_API_KEY}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`TMDB API Error: ${response.status}`)
		}

		return response.json()
	} catch (error) {
		console.error('TMDB Fetch Error:', error)
		throw error
	}
}

// Trending (filmy i seriale razem)
export const getTrending = async (timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/trending/all/${timeWindow}?language=pl-PL`)
}

// Popularne filmy
export const getPopularMovies = async (page: number = 1): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/movie/popular?language=pl-PL&page=${page}`)
}

// Popularne seriale
export const getPopularTVShows = async (page: number = 1): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/tv/popular?language=pl-PL&page=${page}`)
}

// Wyszukiwanie filmów
export const searchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/search/movie?language=pl-PL&query=${encodeURIComponent(query)}&page=${page}`)
}

// Wyszukiwanie seriali
export const searchTVShows = async (query: string, page: number = 1): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/search/tv?language=pl-PL&query=${encodeURIComponent(query)}&page=${page}`)
}

// Szczegóły filmu
export const getMovieDetails = async (movieId: number) => {
	return tmdbFetch(`/movie/${movieId}?language=pl-PL`)
}

// Szczegóły serialu
export const getTVShowDetails = async (tvId: number) => {
	return tmdbFetch(`/tv/${tvId}?language=pl-PL`)
}

// Top rated
export const getTopRatedMovies = async (page: number = 1): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/movie/top_rated?language=pl-PL&page=${page}`)
}

// Nadchodzące premiery
export const getUpcomingMovies = async (page: number = 1): Promise<TMDBResponse> => {
	return tmdbFetch<TMDBResponse>(`/movie/upcoming?language=pl-PL&page=${page}`)
}

// Obsada filmu
export const getMovieCredits = async (movieId: number) => {
	return tmdbFetch(`/movie/${movieId}/credits?language=pl-PL`)
}

// Pobierz listę gatunków filmów
export const getMovieGenres = async () => {
	return tmdbFetch(`/genre/movie/list?language=pl-PL`)
}

// Pobierz listę gatunków seriali
export const getTVGenres = async () => {
	return tmdbFetch(`/genre/tv/list?language=pl-PL`)
}

// Odkrywaj filmy z filtrami
export const discoverMovies = async (params: any) => {
	const queryParams: any = {
		language: 'pl-PL',
		page: String(params.page || 1),
		sort_by: params.sort_by || 'popularity.desc',
	}

	// Dodaj opcjonalne parametry tylko jeśli są zdefiniowane
	if (params.with_genres) queryParams.with_genres = params.with_genres
	if (params['primary_release_date.gte']) queryParams['primary_release_date.gte'] = params['primary_release_date.gte']
	if (params['primary_release_date.lte']) queryParams['primary_release_date.lte'] = params['primary_release_date.lte']
	if (params['vote_average.gte']) queryParams['vote_average.gte'] = params['vote_average.gte']
	if (params['vote_count.gte']) queryParams['vote_count.gte'] = params['vote_count.gte']

	const searchParams = new URLSearchParams(queryParams)
	return tmdbFetch<TMDBResponse>(`/discover/movie?${searchParams}`)
}

// Odkrywaj seriale z filtrami
export const discoverTVShows = async (params: any) => {
	const queryParams: any = {
		language: 'pl-PL',
		page: String(params.page || 1),
		sort_by: params.sort_by || 'popularity.desc',
	}

	// Dodaj opcjonalne parametry tylko jeśli są zdefiniowane
	if (params.with_genres) queryParams.with_genres = params.with_genres
	if (params['first_air_date.gte']) queryParams['first_air_date.gte'] = params['first_air_date.gte']
	if (params['first_air_date.lte']) queryParams['first_air_date.lte'] = params['first_air_date.lte']
	if (params['vote_average.gte']) queryParams['vote_average.gte'] = params['vote_average.gte']
	if (params['vote_count.gte']) queryParams['vote_count.gte'] = params['vote_count.gte']

	const searchParams = new URLSearchParams(queryParams)
	return tmdbFetch<TMDBResponse>(`/discover/tv?${searchParams}`)
}
