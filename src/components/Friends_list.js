import React, { useCallback } from 'react'
import Friends from './Friends'
import { messageCut } from './Function';

function Friends_list({name, id, comment, profileURL, photoURL}) {
  comment = useCallback(messageCut(comment, 40),[]);
  
  return (
      <Friends name={name} id={id} comment={comment} profileURL={profileURL} photoURL={photoURL}></Friends>
  )
}

export default Friends_list