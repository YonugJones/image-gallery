import { useEffect } from 'react'
import type { PixabayImage } from '../types'

type ImageModalProps = {
  image: PixabayImage
  onClose: () => void
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  // close on 'esc'
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const tags = image.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-label='Image preview'
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Modal content */}
      <div
        className='relative z-10 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b px-4 py-3'>
          <div className='text-sm font-semibold text-slate-700'>
            Photo by {image.user}
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close modal'
            className='rounded px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100'
          >
            Close
          </button>
        </div>

        <img
          src={image.largeImageURL || image.webformatURL}
          alt={image.tags}
          className='max-h-[70vh] w-full object-contain bg-black'
        />

        <div className='space-y-3 p-4'>
          <ul className='text-sm text-slate-700'>
            <li>
              <strong>Views:</strong> {image.views}
            </li>
            <li>
              <strong>Downloads:</strong> {image.downloads}
            </li>
            <li>
              <strong>Likes:</strong> {image.likes}
            </li>
          </ul>
          <div className='flex flex-wrap gap-2'>
            {tags.map((t, i) => (
              <span
                key={`${image.id}-${t}-${i}`}
                className='inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
