import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faWifi, faMoon, faBatteryFull, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';
import '../styles/header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';

function Header({left, center, right, num, left_icon, bg}) {
  const navigate = useNavigate();
  const [today, setToday] = useState(()=>new Date());
  const [Hour, setHour] = useState(today.getHours());
  const [Minute, setMinute] = useState(today.getMinutes());
  
  const onClickBtn = () => {
    navigate(-1); // 따로 변수로 지정해주지 않고 바로 넣으면 클릭 이벤트에 발생하는게 아니라 페이지 로드 후 자동 이동함. 
  };
  
  useEffect(()=>{
    const timeId = setTimeout(() => {
      timer();
      clearTimeout(timer);
    }, 1000);
  },[today]);

  const timer = () =>{
    setToday(new Date());
    setHour(today.getHours());
    setMinute(today.getMinutes());
    // console.log(today)
  }
  return (
    <>
    <header id='header' className={bg}>
    {/* status_bar */}
    <div className='status_bar'>
      <div className='left_item'>
        <FontAwesomeIcon icon={faPlane} />
        <FontAwesomeIcon icon={faWifi} />
      </div>
      <div className='center_item'>
        <span>{Hour}</span>:<span>{Minute}</span>
      </div>
      <div className='right_item'>
        <FontAwesomeIcon icon={faMoon} />
        <FontAwesomeIcon icon={faBluetooth} />
        <span><span>100</span>%</span>
        <FontAwesomeIcon icon={faBatteryFull} />
      </div>
    </div>
    {/* //status_bar */}
    {/* title_bar */}
    <div className='title_bar'>
    <div className='title_bar'>
      <h1>{center}<span> {num}</span></h1>
      <div className='left_item'>
      {left && (
        <a href='#'>{left}</a>
      )}
      {left_icon && (
        <Link onClick={onClickBtn} state={{}}><i><FontAwesomeIcon icon={left_icon} /></i></Link>
      )}
      </div> 
      {/*  */}
      <div className='right_item'>
        {right && (
          <a href='#'><i><FontAwesomeIcon icon={right} /></i></a>
        )}</div>
    </div>
    </div>
    </header>
    </>
  )
}

export default Header