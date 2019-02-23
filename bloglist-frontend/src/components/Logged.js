import React, { useState } from 'react'
import blogService from '../services/blogs'
import SuccessNotication from './SuccessNotification'
import BlogList from './Bloglist'
import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

const Logged = ({ blogs, user, setUser, setBlogs, SuccessMessage, setSuccessMessage }) => {


  const clicked = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const blogFormRef = React.createRef()

  return (
    <div>

      <h2>blogs</h2>
      <SuccessNotication message={SuccessMessage} setSuccessMessage={setSuccessMessage} />
      <p> {user.name}  logged in</p>
      <button onClick={clicked}>logout</button>
      <Toggleable buttonLabel="create new" ref={blogFormRef}>
        <Lisaaikkuna blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} blogFormRef={blogFormRef} />
      </Toggleable>
      <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
    </div>
  )
}

const Lisaaikkuna = ({ setBlogs, blogs, setSuccessMessage, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //Ikkuna blogin lisäämistä varten
  const handleAddBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const BlogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(BlogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')

        setSuccessMessage(`${returnedBlog.title} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
      })


  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>

      <form onSubmit={handleAddBlog}>

        <div>
          title:
          <input value={title} onChange={handleTitleChange}>
          </input>
        </div>

        <div>
          author:
          <input value={author} onChange={handleAuthorChange}>
          </input>
        </div>

        <div>
          url:
          <input value={url} onChange={handleUrlChange}>
          </input>
        </div>
        <div>
          <button>lisää blogi</button>
        </div>



      </form>

    </div>



  )
}

Logged.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func.isRequired

}

export default Logged