import { Skeleton } from 'primereact/skeleton'
import React from 'react'

export const HouseSkeleton: React.FC = () => {
  return (
    <div className='col-12'>
      <div className='flex-column xl:align-items-start flex gap-4 p-4 xl:flex-row'>
        <Skeleton className='sm:w-16rem xl:w-10rem shadow-2 h-6rem border-round mx-auto block w-9 xl:block' />
        <div className='flex-column justify-content-between align-items-center xl:align-items-start flex flex-1 gap-4 sm:flex-row'>
          <div className='flex-column align-items-center sm:align-items-start flex gap-3'>
            <Skeleton className='w-8rem border-round h-2rem' />
            <Skeleton className='w-6rem border-round h-1rem' />
            <div className='align-items-center flex gap-3'>
              <Skeleton className='w-6rem border-round h-1rem' />
              <Skeleton className='w-3rem border-round h-1rem' />
            </div>
          </div>
          <div className='sm:flex-column align-items-center sm:align-items-end flex gap-3 sm:gap-2'>
            <Skeleton className='w-4rem border-round h-2rem' />
            <Skeleton shape='circle' className='w-3rem h-3rem' />
          </div>
        </div>
      </div>
    </div>
  )
}
