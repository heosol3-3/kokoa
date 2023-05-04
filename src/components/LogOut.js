import React from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import '../styles/logout.scss';
import App from '../App';

function LogOut() {
  const navigate = useNavigate();
  const onClick = (e) =>{
    authService.signOut();
    navigate('/')
  }
  return (
    <div className='btn_wrap'>
      <button className='btn_logout' onClick={onClick}>로그아웃</button>
    </div>
  )
}

export default LogOut