const BASE_URL = 'https://pixabay.com/api'

type PixabayImage = {
  id: number
  webformatURL: string
  largeImageURL: string
  user: string
  views: number
  downloads: number
  likes: number
  tags: string
}

type PixabayResponse = {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

export async function searchPixabayImages(
  query: string
): Promise<PixabayImage[]> {
  const key = import.meta.env.VITE_PIXABAY_API_KEY

  if (!key) throw new Error('Missing VITE_PIXABAY_API_KEY')
  if (!query.trim()) return []

  const url = new URL(BASE_URL)
  url.searchParams.set('key', key)
  url.searchParams.set('q', query)
  url.searchParams.set('image_type', 'photo')
  url.searchParams.set('per_page', '24')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Pixabay request failed: ${res.status}`)

  const data: PixabayResponse = await res.json()
  return data.hits
}
