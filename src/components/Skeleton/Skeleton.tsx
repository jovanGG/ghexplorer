import React, { ReactElement } from 'react'

import './style.css'

const Skeleton = ({ count }: { count: number }) => {
  const skeletonCount = new Array(count).fill('')

  return (
    <>
      <div className='list-container'>
        {skeletonCount.map((el: ReactElement, index: number) => (
          <div className='repository' key={index}>
            <div className='repository-card'>
              <div className='skeleton skeleton-heading'></div>
              <div className='description'>
                <div className='skeleton skeleton-text'></div>
                <div className='skeleton skeleton-text-small'></div>
              </div>
              <div className='meta-data skeleton-wrap'>
                <div className='skeleton skeleton-text-xsmall'></div>
                <div className='avatar skeleton'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Skeleton
