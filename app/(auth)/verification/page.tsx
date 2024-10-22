import React, { Suspense } from 'react'
import VerificationPage from './verification'

const page = () => {
  return (
    <div>
        <Suspense fallback={<p>Loading...</p>}>
            <VerificationPage/>
        </Suspense>
    </div>
  )
}

export default page