import { useEffect, useState } from 'react'
import { searchPixabayImages } from '../api/pixabay'
import type { PixabayImage } from '../types'

export default function usePixabayImages(query: string) {
  const [images, setImages] = useState<PixabayImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      // first, if empty space is searched, set images as empty array and clear error/loading
      if (!query.trim()) {
        setImages([])
        setError(null)
        setLoading(false)
        return
      }

      // assuming something has been searched...
      setLoading(true)
      setError(null)

      // if checks ensure no state updates on unmounted component, AbortController substitute for mental model practice
      // no stale results overwriting new ones
      // only the latest, still valid request updates state
      try {
        const hits = await searchPixabayImages(query)
        if (!cancelled) setImages(hits)
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error'
        if (!cancelled) setError(message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    // run the function defined above
    run()

    // unmount the component wh
    return () => {
      cancelled = true
    }
  }, [query])

  return { images, loading, error }
}
