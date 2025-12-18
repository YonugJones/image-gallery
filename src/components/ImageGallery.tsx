// Image state lives here and loads images

import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { usePixabayPaginatedImages } from '../hooks/usePixabayPaginatedImages'
import ImageCard from './ImageCard'

export default function ImageGallery() {
  const [query, setQuery] = useState('cats')
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
          <ImageCard key={image.id} image={image} />
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
    </section>
  )
}
