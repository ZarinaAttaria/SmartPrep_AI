import React from 'react'
import '../styles/StartInterview.css'

export default function StartInterview() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
    <div className='interview-screen'>
        <div className='heading'>
            <h2>Welcome Back {currentUser.user.username}!</h2>
            <p>Ready To Ace Your Next Interview?</p>

        </div>
    </div>
    </>
  )
}
