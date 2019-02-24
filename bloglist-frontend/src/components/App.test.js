import React from 'react'
import { 
  render, waitForElement, cleanup
} from 'react-testing-library'
jest.mock('../services/blogs')
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    ) 

    expect(component.container).toHaveTextContent(
        'login in to application'
      )
  })
})