import type { PixabayResponse, SearchOptions } from '../types'

const BASE_URL = 'https://pixabay.com/api'

export async function searchPixabayImages(
  query: string,
  options: SearchOptions = {}
): Promise<PixabayResponse> {
  const key = import.meta.env.VITE_PIXABAY_API_KEY

  if (!key) throw new Error('Missing VITE_PIXABAY_API_KEY')
  if (!query.trim()) return { total: 0, totalHits: 0, hits: [] }

  const page = options.page ?? 1
  const perPage = options.perPage ?? 24

  const url = new URL(BASE_URL)
  url.searchParams.set('key', key)
  url.searchParams.set('q', query)
  url.searchParams.set('image_type', 'photo')
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', String(perPage))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Pixabay request failed: ${res.status}`)

  const data: PixabayResponse = await res.json()
  return data
}
