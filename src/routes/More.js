import React, { useEffect, useState } from 'react'
import { authService, db } from '../fbase';
import { doc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { faBuildingColumns, faComment, faGear, faGraduationCap, faHandPeace, faHouseChimney, faInfoCircle, faPaintBrush, faPencil, faSmile, faTv, faUser, faUtensils, faVideo, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from '../components/Tab';
import LogOut from '../components/LogOut';
import '../styles/more.scss';

function More() {
  const [profileURL, setProfileURL] = useState();

  useEffect(() => {
    getProfile();
  },[]);

  const getProfile = async() =>{
    try {
      const docRef = doc(db, `${authService.currentUser.uid}`,`profile`);
      const docSnap = await getDoc(docRef);
      setProfileURL(docSnap.data().profileURL);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Header center={'More'} num={1} right={faGear} />
    <main className='more'>
      <section className='user_info'>
        <h2 className='blind'>사용자 정보</h2>
        <span className='profile_img empty' style={profileURL&&{backgroundImage:`url(${profileURL})`, backgroundPosition:`center center`}}></span>
        <span className='profile_info'>
          <span className='profile_name'>{authService.currentUser.displayName}</span>
          <span className='profile_email'>{authService.currentUser.email}</span>
        </span>
        <span className='chat_img'><FontAwesomeIcon icon={faComment} /></span>
      </section>
      <section className='user_menu'>
        <h2 className='blind'>사용자 메뉴</h2>
        <ul>
          <li><a><i><FontAwesomeIcon icon={faSmile} /></i></a></li>
          <li><a><i><FontAwesomeIcon icon={faPaintBrush} /></i></a></li>
          <li><a><i><FontAwesomeIcon icon={faHandPeace} /></i></a></li>
          <li><a><i><FontAwesomeIcon icon={faUser} /></i></a></li>
        </ul>
      </section>
      <section className='plus_friends'>
        <header>
          <h2>PLUS FRIENDS</h2>
          <span><FontAwesomeIcon icon={faInfoCircle} />Learn More</span>
        </header>
        <ul className='plus_list'>
          <li><a href='#'><FontAwesomeIcon icon={faUtensils} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faHouseChimney} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faTv} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faPencil} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faGraduationCap} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faBuildingColumns} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faWonSign} />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faVideo} />Order</a></li>
        </ul>
      </section>
      <section className='more_app'>
        <h2 className='blind'>앱 더보기</h2>
        <ul>
          <li>
            <a href='#'>
              <div>
                <span className='app_icon'></span>Kakao Story
              </div>
              <div className='app__catch'>
                <p>그대로의 일상 이야기,<br />카카오스토리</p>
              </div>
            </a>
          </li>
          <li>
            <a href='#'>
              <div>
                <span className='app_icon'></span>Path
              </div>
              <div className='app_catch'>
                <p>그대로의 일상 이야기,<br />카카오스토리</p>
              </div>
            </a>
          </li>
          <li>
            <a href='#'>
              <div>
                <span className='app_icon'></span>Kakao friends
              </div>
              <div className='app__catch'>
                <p>We are Friends!<br />일상의 즐거움<br />카카오프렌즈</p>
              </div>
            </a>
          </li>
        </ul>
      </section>
      <LogOut />
    </main>
    <Tab more={`on`} />
    </>
  )
}

export default More