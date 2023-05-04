import React, { useCallback, useState } from 'react'
import '../styles/chatting.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperPlane, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { authService, db } from '../fbase';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { storage } from '../fbase';
import { v4 as uuidv4 } from 'uuid';

function InputText({name}) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");
  const [btnToggle, setBtnToggle] = useState(false);

  const onChange = useCallback((e) =>{
    setText(e.target.value);
    e.target.value !=="" ? setBtnToggle(true) : setBtnToggle(false);
  },[])

  const sendText = async(e) =>{
    e.preventDefault();
      try {
        let attachmentURL = "";
        if(attachment){
          const storageRef = ref(storage, `${authService.currentUser.uid}/${uuidv4()}`);
          const upload = await uploadString(storageRef, attachment, 'data_url');
          attachmentURL = await getDownloadURL(ref(storage, upload.ref));
          // console.log(attachmentURL)
        }
      const docRef = await addDoc(collection(db, "chat"), {
        text: text,
        date: Date.now(),
        owner: authService.currentUser.uid,
        talker: name,
        attachmentURL
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setText("");
    setAttachment("");
    setBtnToggle(false);
  }
  const onFileChange = (e) =>{
    const {target:{files}} = e;
    const img = files[0];

    const preview = new FileReader();
    preview.onloadend = (event) =>{
      const {currentTarget:{result}} = event;
      setAttachment(result);
    }
    preview.readAsDataURL(img);
    setBtnToggle(prev => !prev);
  }
  const clearAttach = async(e) =>{
    await setAttachment("");
    setBtnToggle(false);
  }

  return (
    <>
    <footer>
    <form onSubmit={sendText}>
    <fieldset className='text_box'> 
    <legend className='blind'>채팅 입력창</legend>
      <label htmlFor='attach' className='plus_btn'><FontAwesomeIcon icon={faPlus} /></label>
      <input id='attach' type='file' accept='image/*' onChange={onFileChange} /> 
      <label htmlFor='chatting' className='blind'>채팅 입력</label>
      <input type='text' id='chatting' className='text_field' onChange={onChange} value={text} />
      <span className='emotion_btn'><i><FontAwesomeIcon icon={faSmile} /></i></span>
      { btnToggle ? (
        <button type='submit' className='btn'><i><FontAwesomeIcon icon={faPaperPlane} /></i></button>
      ) : (      
      <span className='btn voice'><i><FontAwesomeIcon icon={faMicrophone} /></i></span>)}
      {attachment && (
        <div className='preview'>
          <div className='item'>
          <img src={attachment} alt=''/>
          <button type='button' onClick={clearAttach}><FontAwesomeIcon icon={faXmark}/></button>
          </div>
        </div>
      )}
    </fieldset>
    </form>
    </footer>
    </>
  )
}

export default InputText