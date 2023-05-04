import React from 'react';
import { Link } from 'react-router-dom';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

function Friends({id, name, comment, profileURL, photoURL}) {
  const profileImage = {
    backgroundImage : `url(${profileURL})`,
    backgroundPosition : `50% 50%`
  }

  return (
    <li>
      <Link to={'/profile'} state={{id, left_icon: faXmark,right: faUser,name, profileURL, photoURL, comment}}> 
        <span className='profile_img empty' style={profileImage}></span>
        <span className='profile_name'>{name}</span>
        <span className='profile_message'>{comment}</span>
      </Link>
    </li>
  )
}

export default Friends