import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Link } from 'react-router-dom'

function User_info({name, profileURL, id, photoURL, comment}) {
  const profileImage = {
    backgroundImage : `url(${profileURL})`,
    backgroundPosition : `50% 50%`
  }
  // console.log(profileURL)
  return (
    <ul>
    <li>
      <Link to={`/profile`} state={{id, left_icon: faXmark,right: faUser, name, profileURL, photoURL, comment}}>
        <span className='profile_img empty' style={profileImage}></span>
        <span className='profile_name'>{name}</span>
        <span className='profile_message'>{comment}</span>
      </Link>
    </li>
    </ul>
  )
}

export default User_info