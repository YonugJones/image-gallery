import { useEffect, useRef, useState } from 'react'
import { searchPixabayImages } from '../api/pixabay'
import type { PixabayImage } from '../types'

export function usePixabayPaginatedImages(query: string, perPage = 24) {
  const [images, setImages] = useState<PixabayImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(0)

  const prevQueryRef = useRef(query)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const trimmed = query.trim()

      let pageToFetch = page

      // If query changes since last run, reset pagination *once*
      const queryChanged = prevQueryRef.current !== query
      if (queryChanged) {
        prevQueryRef.current = query
        setImages([])
        setTotalHits(0)
        setError(null)
        setPage(1)
        pageToFetch = 1
      }

      if (!trimmed) {
        prevQueryRef.current = query
        setImages([])
        setTotalHits(0)
        setError(null)
        setLoading(false)
        setPage(1)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await searchPixabayImages(query, {
          page: pageToFetch,
          perPage,
        })
        if (cancelled) return

        setTotalHits(data.totalHits)
        setImages((prev) =>
          pageToFetch === 1 ? data.hits : [...prev, ...data.hits]
        )
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error'
        if (!cancelled) setError(message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [query, page, perPage])

  const hasMore = images.length < totalHits

  function loadMore() {
    if (loading || !hasMore) return
    setPage((p) => p + 1)
  }

  return { images, loading, error, hasMore, loadMore }
}
