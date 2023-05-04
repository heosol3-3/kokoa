import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import '../styles/chat_fa_btn.scss';

function Fa_btn({setSearchBoxToggle}) {
  return (
    <div className='chat_fa_btn' onClick={() =>{
      setSearchBoxToggle(prev=>!prev);
      window.pageYOffset !==0 &&
      window.scroll({
        top:0,
        behavior: 'smooth'
      }
      )}}>
      <div className='btn__inner'>
      <i><FontAwesomeIcon icon={faSearch} /></i>
      </div>
    </div>
  )
}

export default Fa_btn