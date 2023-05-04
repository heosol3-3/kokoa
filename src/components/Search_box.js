import React from 'react';
import '../styles/search_box.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search_box({searchBoxToggle}) {
  return (
    <form className={`search_box ${searchBoxToggle && "on"}`}>
    <fieldset className='search_inner'>
      <legend className='blind'>검색창</legend>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input type='search' name='search' id='search' placeholder='Find friends, Chats, Plus friends' />
    </fieldset>
  </form>
  )
}

export default Search_box