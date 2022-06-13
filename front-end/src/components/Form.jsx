import React from 'react'

export default function Form() {

    const handleFormSubmit = (event) => {
        const username = event.target[0].value
        event.preventDefault()
        if (username) {
            window.location.replace('/' + username)
        }
    }

  return (
    <div className='Form'>
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder='Username'/>
            <button type="submit">Chat</button>
        </form>
    </div>
  )
}
