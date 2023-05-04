import React from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faEnvelope, faMobileScreenButton, faQrcode } from '@fortawesome/free-solid-svg-icons'
import Tab from '../components/Tab';
import '../styles/header.scss';
import '../styles/find.scss';


const Find = () => {
  return (
    <>
    <Header left={'Edit'} center={'Find'} />
    <main>
      <ul className='find_method'>
        <li><a href='#'><i><FontAwesomeIcon icon={faAddressBook} /></i>Find</a></li>
        <li><a href='#'><i><FontAwesomeIcon icon={faQrcode} /></i>QR Code</a></li>
        <li><a href='#'><i><FontAwesomeIcon icon={faMobileScreenButton} /></i>Shake</a></li>
        <li><a href='#'><i><FontAwesomeIcon icon={faEnvelope} /></i>Invite via SNS</a></li>
      </ul>
      <section className='recommend_section'>
        <header><h2>Recommended Friends</h2></header>
        <ul>
          <li>You have no recommended friends.</li>
        </ul>
      </section>
    </main>
    <Tab find={`on`} />
    </>
  )
}

export default Find