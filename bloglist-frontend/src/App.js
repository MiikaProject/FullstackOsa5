import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Logged = ({blogs,user,setUser}) => {
  const clicked = () =>{
    window.localStorage.clear()
    setUser(null)
  }
  return (
    <div>
    
      <h2>blogs</h2>
      <p> {user.name}  logged in</p>
      <button onClick={clicked}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Lisaaikkuna/>
    </div>
  )
}

const Lisaaikkuna = (props) => {
  return(
    <div>Lisää</div>
  )
}



const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>login in to application</h2>
      <form onSubmit={handleLogin}>

        <div>
          kayttajatunnus
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}
          >
          </input>
        </div>
        <div>
          salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ErrorMessage,setErrorMessage] = useState(null)
  const [user,setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }


  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggaa', username, password);

    try {
      const user = await loginService.login({
        username,password
      })
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
      


    } catch (expection) {
      console.log('käyttäjätunnus tai salasana virheellinen');
      
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }



  }
  if (user === null) {
    return (
      <div>
        <Login handleLogin={handleLogin} setUsername={setUsername} username={username} setPassword={setPassword} password={password} />
      </div>
    )
  }


  return (
    <div>
    <Logged blogs={blogs} user={user} setUser={setUser}/>
    </div>
  )
}

export default App