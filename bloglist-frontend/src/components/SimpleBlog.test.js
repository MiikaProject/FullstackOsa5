import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'

import SimpleBlog from './SimpleBlog'


afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'Otsikko',
        author: 'Authori',
        likes: 5

    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Otsikko'
    )
    expect(component.container).toHaveTextContent(
        'Authori'
    )
    expect(component.container).toHaveTextContent(
        '5'
    )
})

it('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Otsikko',
        author: 'Authori',
        likes: 5

    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})