import React from 'react'
import Notication from './Notification'

const Login = ({ handleLogin, username, setUsername, password, setPassword, ErrorMessage }) => {
    return (
      <div>
        <h2>login in to application</h2>
        <Notication message={ErrorMessage}/>
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

  export default Login