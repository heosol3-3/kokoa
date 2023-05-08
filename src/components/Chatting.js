import React, { useCallback } from 'react'
import '../styles/chats.scss';
import { Link } from 'react-router-dom';
import { undefinedFix, messageCut } from './Function';

function Chatting({name, message, profileURL, photoURL, comment}) {
  
  let timer = new Date();
  let hours = timer.getHours();
  let minutes = timer.getMinutes();
  // 시간 임의 데이터 
  // state 보정
  useCallback(undefinedFix(name, message, hours, minutes, photoURL),[]);

  // 메세지 길이 조절
  message = useCallback(messageCut(message, 40),[message]);
  
  // 프로필 변경
  if (profileURL !== undefined)
  var proflieImg = {
    backgroundImage : `url(${profileURL})`,
    backgroundPosition : `50% 50%`
  }

  return (
    <li>
      <Link to={'/Chatting'} state={{name, hours, minutes, message, profileURL, photoURL, comment}}>
          <span className='chats_img empty' style={proflieImg}></span>
          <span className='chats_cont'>
            <span className='chats_name'>{name}</span>
            <span className='chats_latest'>{message}</span>
          </span>
          <span className='chats_time'><span>{hours}</span>:<span>{minutes}</span></span>
      </Link>
    </li>
  )
}

export default Chatting