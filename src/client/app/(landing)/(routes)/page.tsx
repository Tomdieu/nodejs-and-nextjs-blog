import React from 'react'

import PostForm from '@/components/Form'
import Header from '@/components/global/Header'

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <div className='w-full h-full'>
      <Header/>
      {/* <PostForm title={'Create'}/> */}
    </div>
  )
}

export default LandingPage