import { useEffect, useState } from 'react'
import { searchPixabayImages } from '../api/pixabay'
import type { PixabayImage } from '../types'

export default function usePixabayImages(query: string) {
  const [images, setImages] = useState<PixabayImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Tracks whether this particular effect run is still "active".
    // If the component unmounts or query changes, we mark this run as cancelled
    // so its async results can't update state.
    let cancelled = false

    async function run() {
      // If query is empty/whitespace, treat it as "no search":
      // clear results and ensure we're not showing loading/error.
      if (!query.trim()) {
        setImages([])
        setError(null)
        setLoading(false)
        return
      }

      // Start a new request cycle for the current query.
      setLoading(true)
      setError(null)

      try {
        // Kick off the fetch. This may resolve after the component unmounts
        // or after query changes (effect re-runs).
        const hits = await searchPixabayImages(query)

        // Only update state if this effect run is still active.
        if (!cancelled) setImages(hits)
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error'
        // only update state if this effect run is still active
        if (!cancelled) setError(message)
      } finally {
        // only update state if this effect run is still active
        if (!cancelled) setLoading(false)
      }
    }

    // run the async request for the current query
    run()

    // Cleanup: runs before the effect re-runs (query changes) and on unmount.
    // Marks this effect run as inactive so late async results are ignored.
    return () => {
      cancelled = true
    }
  }, [query])

  return { images, loading, error }
}
