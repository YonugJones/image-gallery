import ImageCard from './ImageCard'

export default function ImageGallery() {
  return (
    <section className='p-4'>
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </section>
  )
}
