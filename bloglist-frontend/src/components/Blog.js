import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs, blogs, user }) => {
  //kuvaa kuinka suuri määrä infoa näytetään
  const [BigDisplay, setBigDisplay] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Lisaaja = () => {
    if (blog.user === undefined) {
      return (
        <div></div>
      )
    } else {
      return (
        <span>added by {blog.user.username}</span>
      )
    }

  }

  const toggleDisplay = () => {
    if (BigDisplay === true) {
      setBigDisplay(false)
    } else if (BigDisplay === false) {
      setBigDisplay(true)
    }
  }

  const handleLike = async () => {

    //jos ei useria blogilla
    if (blog.user === undefined) {
      const likedBlog = {
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }


      blogService.update(blog.id, likedBlog)
        .then(response => {

          setBlogs(blogs.map(blogi => {
            if (blog.id === blogi.id) {
              return response
            } else {
              return blogi
            }
          }))
        })

    } else {
      //jos user blogilla
      const likedBlog = {
        user: blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      blogService.update(blog.id, likedBlog)
        .then(response => {

          setBlogs(blogs.map(blogi => {
            if (blog.id === blogi.id) {
              return response
            } else {
              return blogi
            }
          }))
        })
    }
  }


  const handleRemove = async () => {
    const decision = window.confirm(`remove blog ${blog.title}`)

    if (decision === true) {
      blogService
        .remove(blog.id)
        .then(response => {
          console.log(response)
          blogService.getAll()
            .then(response => {
              setBlogs(response)
            })
        })
    } else {
      return
    }

  }

  if (BigDisplay === false) {
    return (
      <div style={blogStyle}>
        <div onClick={toggleDisplay}>
          {blog.title} {blog.author}
        </div>

      </div>
    )
  } else {
    if (blog.user === undefined || blog.user.username !== user.username) {
      return (
        <div style={blogStyle}>
          <div onClick={toggleDisplay}>
            <span>{blog.title} {blog.author}</span>
          </div>
          <div>{blog.url}</div>
          <div><Lisaaja /></div>
          <span>{blog.likes} likes <button onClick={handleLike}>like</button> </span>
        </div>
      )
    }
    return (
      <div style={blogStyle}>
        <div onClick={toggleDisplay}>
          <span>{blog.title} {blog.author}</span>
        </div>
        <div>{blog.url}</div>
        <div><Lisaaja /></div>
        <span>{blog.likes} likes <button onClick={handleLike}>like</button> </span>
        <div><button onClick={handleRemove}>remove</button></div>

      </div>
    )

  }

}
export default Blog