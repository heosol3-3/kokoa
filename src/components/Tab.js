import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faComment, faEllipsis, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import '../styles/tab.scss';
import '../styles/common.css';

function Tab({main, chats, find, more}) {

  return (
    <nav className='tab_bar'>
      <ul>
        <li><Link to={'/'}><i className={main}><FontAwesomeIcon icon={faUser} /></i></Link></li>
        <li>
        <Link to={'/Chats'} ><i className={chats}><FontAwesomeIcon icon={faComment} /></i></Link></li>
        <li><Link to={'/Find'} ><i className={find}><FontAwesomeIcon icon={faMagnifyingGlass} /></i></Link></li>
        <li><Link to={'/More'} ><i className={more}><FontAwesomeIcon icon={faEllipsis} /></i></Link></li>
      </ul>
    </nav>
  )
}

export default Tab