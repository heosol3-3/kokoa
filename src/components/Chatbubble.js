import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../fbase';
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../fbase';
import { faEraser, faPencil } from '@fortawesome/free-solid-svg-icons';

function Chatbubble(props) {
  const {chat:{text, id, talker, attachmentURL}, isOwner, hours, minutes} = props;
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [oldText, setOldText] = useState("");

  const clickDelete = async(e) =>{
    e.preventDefault();
    const confirm = window.confirm("삭제하시겠습니까?");
    if(confirm) {
      const date = await deleteDoc(doc(db,"chat", `/${id}`));
      attachmentURL && await deleteObject(ref(storage, attachmentURL));
    }
  }

  const toggleEdit = () =>{
    setEditing(prev => !prev);
    setOldText(newText);
    console.log(`toggle edit`)
    console.log(newText.length)
  }

  const onEditSubmit = async(e) =>{
    e.preventDefault();
    if(newText !== oldText){
    const newRef = doc(db, "chat", `/${id}`);
    await updateDoc(newRef, {
      text: newText,
      date: Date.now()
    })
  }
    setEditing(false);
    console.log(`edit done`)
  }
  const onChange = (e) =>{
    const {target:{value}} = e;
    setNewText(value);
  }
  return (
    <>
    {editing ? (
      <form onSubmit={onEditSubmit}>
        <div className='chat_wrap edit'>
          <input type='text' onChange={onChange} value={newText} className='chat' autoFocus style={{width:`${newText.length}ch`}}/>
          <div className='btn_wrap'>
            <button type='submit' className='edit' name='submit'><i><FontAwesomeIcon icon={faPencil} />수정</i></button>
            <button type='button' className='delete' onClick={clickDelete}><i><FontAwesomeIcon icon={faEraser} />삭제</i></button>
          </div>
        </div>
      </form>
    ) : (
      isOwner && (
        <>
        <div className='chat_wrap' onClick={toggleEdit}>
          <p className='chat'>
            {attachmentURL && (<img src={attachmentURL} alt=''/>)}
            <span >{text}</span>
          </p>
          <span className='chat_time'>{hours}:{minutes}</span>
          {/* <div className='btn_wrap'>
            <button type='button' className='edit' onClick={toggleEdit}><i><FontAwesomeIcon icon={faPencil} /></i></button>
          </div> */}
        </div>
        </>
        )
      )
    }
    </>
  )
}

export default Chatbubble