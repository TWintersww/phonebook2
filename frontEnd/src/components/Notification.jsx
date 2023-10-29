const Notification = ({ message }) => {
    //invisible if errorMessage state is empty
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
}

export default Notification
