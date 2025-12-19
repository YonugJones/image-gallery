// Image state lives here and loads images

import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { usePixabayPaginatedImages } from '../hooks/usePixabayPaginatedImages'
import type { PixabayImage } from '../types'
import ImageCard from './ImageCard'
import ImageModal from './ImageModal'
import ImageCardSkeleton from './ImageCardSkeleton'

export default function ImageGallery() {
  const [query, setQuery] = useState('cats')
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null)
  const debouncedQuery = useDebounce(query, 300)
  const { images, loading, error, hasMore, loadMore } =
    usePixabayPaginatedImages(debouncedQuery, 24)

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef(loadMore)

  useEffect(() => {
    loadMoreRef.current = loadMore
  }, [loadMore])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    if (loading || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (loading) return

        loadMoreRef.current()
      },
      {
        root: null,
        rootMargin: '600px',
        threshold: 0,
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loading])

  return (
    <section className='p-4'>
      {/* Search images section */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='mb-4 w-full rounded border p-2'
        placeholder='Search images...'
      />

      {/* Error message section */}
      {error && <p className='text-red-700'>Error: {error}</p>}

      {/* Image gallery section */}
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {/* Initial load skeletons */}
        {loading &&
          images.length === 0 &&
          Array.from({ length: 12 }).map((_, i) => (
            <ImageCardSkeleton key={`initial-${i}`} />
          ))}

        {/* Loaded images */}
        {images.map((image) => (
          <button
            key={image.id}
            type='button'
            className='text-left w-full'
            onClick={() => setSelectedImage(image)}
          >
            <ImageCard image={image} />
          </button>
        ))}

        {/* Append skeletons during infinite load */}
        {loading &&
          images.length > 0 &&
          Array.from({ length: 4 }).map((_, i) => (
            <ImageCardSkeleton key={`append-${i}`} />
          ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className='h-10' />

      {/* Load more images button */}
      <div className='mt-6 flex justify-center'>
        <button
          type='button'
          onClick={loadMore}
          disabled={loading || !hasMore}
          className='rounded bg-purple-600 px-4 py-2 font-semibold text-white disabled:opacity-50'
        >
          {loading ? 'Loading' : hasMore ? 'Load more' : 'No more results'}
        </button>
      </div>

      {/* Selected image modal section */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  )
}
