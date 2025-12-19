// Image state lives here and loads images

import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { usePixabayPaginatedImages } from '../hooks/usePixabayPaginatedImages'
import type { PixabayImage } from '../types'
import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

export default function ImageGallery() {
  const [query, setQuery] = useState('cats')
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null)
  const debouncedQuery = useDebounce(query, 300)
  const { images, loading, error, hasMore, loadMore } =
    usePixabayPaginatedImages(debouncedQuery, 24)

  return (
    <section className='p-4'>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='mb-4 w-full rounded border p-2'
        placeholder='Search images...'
      />

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-700'>Error: {error}</p>}

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
      </div>

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

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  )
}
