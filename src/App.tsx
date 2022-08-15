import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Nav from './components/Nav/Nav'

const Framework = React.lazy(() => import('./pages/Framework'))
const Repository = React.lazy(() => import('./pages/Repository'))

function App() {
  return (
    <>
      <Nav />
      <Suspense>
        <Routes>          
          <Route path='/' element={<Navigate to='/react' />} />
          <Route path='/:framework' element={<Framework />} />                      
          <Route path='/repository/*' element={<Repository />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
