import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useCallback, useState } from 'react'
import { authService } from '../fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../styles/login.scss';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);

  const onChange = useCallback((e) => {
    const {target:{name, value}} =e;
    name === 'email' ? setEmail(value) : setPassword(value);
    if(email !=="" && password !== "") setActive(true);
    else setActive(false);
  },[email, password])

  const onSubmit = useCallback(async(e) => {
    e.preventDefault();
    setActive(false);
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password);
        console.log(`가입완료`);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
        console.log(`로그인 전송 완료`);
      }
    } catch (error) {
      console.log(error);
      let message='';
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password" :
          message = "이메일 혹은 비밀번호가 일치하지 않습니다";
          break;
        case "auth/email-already-in-use" :
          message = "이미 사용 중인 이메일입니다.";
          break;
        case "auth/weak-password" : 
          message = "비밀번호는 6글자 이상이어야 합니다.";
          break;
        case "auth/network-requset-failed" : 
          message = "네트워크 연결에 실패하였습니다.";
          break;
        case "auth/invalid-email" :
          message = "잘못된 이메일 형식입니다.";
          break;
        case "auth/internal-error" :
          message = "잘못된 요청입니다.";
          break;
        default :
          message = "로그인에 실패하였습니다";
          break;
      }
      setError(message);
    }
  },[email, password, newAccount])
  
  const onClick = async(e) => {
    const name = e.target.name;
    let provider;
    if(name === 'google'){
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
  }

  const accountToggle = (e) => {
    setNewAccount(prev => !prev);
  }

  return (
    <div className={`login ${!newAccount&&('login__active')}`}>
      <h1 className='title'>TALK</h1>
      <form onSubmit={onSubmit} className='input'>
        <legend className='blind'>회원가입 / 로그인</legend>
        <fieldset>
          <ul className='input_wrap'>
            <li>
              <input name='email' type='email' placeholder='이메일 또는 전화번호' value={email} onChange={onChange} required />
            </li>
            <li>
              <input name='password' type='password' placeholder='비밀번호' value={password} onChange={onChange} required />
            </li>
          </ul>
          <p className='error_message'>{error}</p>
          <input className={active? `active` : ``} type='submit' value={newAccount ? '회원가입' : '로그인'} />
          <div className='bottom' style={{margin: 20}}>
            <span onClick={accountToggle} >{newAccount ? "이미 회원이신가요?" : "회원가입"}</span>
          </div>
          <ul className='sns_login'>
            <li><button onClick={onClick} onMouseEnter={() => {console.log(1)}} name='google'><FontAwesomeIcon icon={faGoogle} /><span>Sign up with Google</span></button></li>
            <li><button onClick={onClick} name='github'><FontAwesomeIcon icon={faGithub} /><span>Sign up with Github</span></button></li>
          </ul>
        </fieldset>
      </form>
    </div>
  )
}

export default Login