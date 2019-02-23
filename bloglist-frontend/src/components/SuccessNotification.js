import React from 'react'

const SuccessNotication = ({message}) => {

  const notificationStyle = {
    color: 'green',
    borderSize: 2,
    borderColor: 'green',
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

export default SuccessNotication