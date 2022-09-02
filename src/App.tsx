import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import store from './store/store'
import Nav from './components/Nav/Nav'

const Framework = React.lazy(() => import('./pages/Framework'))
const Repository = React.lazy(() => import('./pages/Repository'))

function App() {
  return (
    <>
      <Provider store={store}>
        <Nav />
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Routes>
            <Route path='/' element={<Navigate to='/react' />} />
            <Route path='/:framework' element={<Framework />} />
            <Route path='/repository/*' element={<Repository />} />
          </Routes>
        </Suspense>
      </Provider>
    </>
  )
}

export default App
