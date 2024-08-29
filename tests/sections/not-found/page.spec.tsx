import React from 'react'
import { render, screen } from '@testing-library/react'

import { Page } from '../../../src/sections/not-found/page'

test('Not found component display header', () => {
  render(<Page />)

  const heading = screen.getByText(/NotFound/i)

  expect(heading).toBeInTheDocument();
})
