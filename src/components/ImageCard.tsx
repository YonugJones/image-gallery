import type { PixabayImage } from '../types'

type ImageCardProps = {
  image: PixabayImage
}

export default function ImageCard({ image }: ImageCardProps) {
  const tags = image.tags.split(',').map((tag) => tag.trim())

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg hover:cursor-pointer'>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className='h-48 w-full object-cover'
        loading='lazy'
      />

      <div className='px-6 py-4'>
        <div className='mb-2 text-xs font-bold text-slate-600'>
          Photo by {image.user}
        </div>

        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>

      <div className='px-6 py-4'>
        {tags.map((t, i) => (
          <span
            key={`${image.id}-${t}-${i}`}
            className='mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  )
}
