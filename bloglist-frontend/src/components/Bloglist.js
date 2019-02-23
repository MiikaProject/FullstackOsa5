import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user }) => {




  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
      )}
    </div>

  )
}

export default BlogList