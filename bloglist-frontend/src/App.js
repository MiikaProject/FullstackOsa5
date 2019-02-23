import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import Logged from './components/Logged'
import Login from './components/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ErrorMessage, setErrorMessage] = useState(null)
  const [SuccessMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

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
    console.log('loggaa', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

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
        <Toggleable buttonLabel="login">
          <Login handleLogin={handleLogin} setUsername={setUsername} username={username} setPassword={setPassword} password={password} ErrorMessage={ErrorMessage} setErrorMessage={setErrorMessage} />
        </Toggleable>
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