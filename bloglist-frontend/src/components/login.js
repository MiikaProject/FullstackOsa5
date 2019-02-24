import React from 'react'
import Notication from './Notification'
import {useField} from '../hooks/index'

const Login = ({ handleLogin, username, setUsername, salasana, ErrorMessage, name }) => {



    return (
      <div>
        <h2>login in to application</h2>
        <Notication message={ErrorMessage}/>
        <form onSubmit={handleLogin}>
  
          <div>
            kayttajatunnus
          <input {...name}
            >
            </input>
          </div>
          <div>
            salasana
              <input
              {...salasana}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  export default Login