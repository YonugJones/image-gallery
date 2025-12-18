// Image state lives here and loads images

import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { usePixabayImages } from '../hooks/usePixabayImages'
import ImageCard from './ImageCard'

export default function ImageGallery() {
  const [query, setQuery] = useState('cats')
  const debouncedQuery = useDebounce(query, 300)
  const { images, loading, error } = usePixabayImages(debouncedQuery)

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
    </section>
  )
}
