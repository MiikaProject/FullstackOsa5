import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Logged from './Logged'
import Login from './login'
import { useField } from '../hooks/index'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [ErrorMessage, setErrorMessage] = useState(null)
  const [SuccessMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const name = useField('text')
  const salasana = useField('text')

  const propsName = {
    value:name.value,
    onChange:name.onChange
  }
  const propsSalasana = {
    value:salasana.value,
    onChange:salasana.onChange
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }


  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggaa', name.value, salasana.value)
    const username = name.value
    const password = salasana.value
    try {
      const user = await loginService.login({
        username, password
      })
      
      
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      name.reset()
      salasana.reset()
      

    } catch (expection) {
      console.log('käyttäjätunnus tai salasana virheellinen')

      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  if (user === null) {
    return (
      <div>
        
          <Login handleLogin={handleLogin} setUsername={setUsername} username={username}  ErrorMessage={ErrorMessage} setErrorMessage={setErrorMessage} name={propsName} salasana={propsSalasana} />
        
      </div>
    )
  }

  return (
    <div>
      <Logged blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs} SuccessMessage={SuccessMessage} setSuccessMessage={setSuccessMessage} />
    </div>
  )
}

export default App