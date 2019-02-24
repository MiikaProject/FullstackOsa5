import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders only title and author first', () => {
    const blog = {
        title: 'Otsikko',
        author: 'Authori',
        url: 'url',
        likes: 5,

    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Otsikko'
    )
    expect(component.container).toHaveTextContent(
        'Authori'
    )
    expect(component.container).not.toHaveTextContent(
        'url'
    )
    expect(component.container).not.toHaveTextContent(
        '5'
    )
    

})

it('Clicking on name gives more information', async () => {
    const blog = {
        title: 'Otsikko',
        author: 'Authori',
        url: 'url',
        likes: 5
    }

    const component= render(
        <Blog blog={blog}/>
    )

    const div = component.container.querySelector('.pienitieto')
    
    expect(div).toHaveTextContent('Otsikko')
    expect(div).not.toHaveTextContent('url')
      
    const button = component.container.querySelector('.nimipalkki')
    fireEvent.click(button)

    const div2 = component.container.querySelector('.isotieto')
    expect(div2).toHaveTextContent('url') 
})


