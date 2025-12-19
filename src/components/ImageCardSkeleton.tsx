export default function ImageCardSkeleton() {
  return (
    <div className='max-w-sm overflow-hidden rounded shadow-lg'>
      <div className='h-48 w-full animate-pulse bg-slate-200' />

      <div className='space-y-3 px-6 py-4'>
        <div className='h-3 w-32 animate-pulse rounded bg-slate-200' />
        <div className='h-3 w-24 animate-pulse rounded bg-slate-200' />
        <div className='h-3 w-28 animate-pulse rounded bg-slate-200' />
        <div className='h-3 w-20 animate-pulse rounded bg-slate-200' />
      </div>

      <div className='flex flex-wrap gap-2 px-6 py-4'>
        <div className='h-6 w-14 animate-pulse rounded-full bg-slate-200' />
        <div className='h-6 w-16 animate-pulse rounded-full bg-slate-200' />
        <div className='h-6 w-12 animate-pulse rounded-full bg-slate-200' />
      </div>
    </div>
  )
}
