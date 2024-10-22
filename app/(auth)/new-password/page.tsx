import React, { Suspense } from 'react'
import Page from './Newpassword'

const page = () => {
  return (
    <div>
        <Suspense fallback={<p>Loading...</p>}> 
            <Page/>
        </Suspense>
    </div>
  )
}

export default page