import React from 'react'

const Notification = ({message}) => {

    const notificationStyle = {
      color: 'red',
      borderSize: 2,
      borderColor: 'red',
      borderStyle: 'solid',
      borderRadius: '5px',
      backgroundColor: 'lightgrey',
      padding: '5px',
      fontSize: 30
  }
    if(message==null){
      return null
    }
    return(
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification