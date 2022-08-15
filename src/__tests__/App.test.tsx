import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import App from '../App'

it('app renders successfully', () => {
  act(() => {
    render(<App />, {
      wrapper: BrowserRouter,
    })
  })

  expect(screen.getByRole('img', { name: 'Github Logo' })).toBeInTheDocument()
})
