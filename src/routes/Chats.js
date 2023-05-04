import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Search_box from '../components/Search_box';
import Chatting from '../components/Chatting';
import Tab from '../components/Tab';
import Fa_btn from '../components/Fa_btn';
import profiles from '../json/chat.json';
import { mergeData } from '../components/Function';
import '../styles/chats.scss';

function Chats() {

  const [friends, setFriends] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getFriends = async() => {
    const {data:friends} = await axios.get('https://jsonplaceholder.typicode.com/users');
    let data = mergeData(friends, profiles);
    setFriends(data);
    setIsLoading(false);
  }
  useEffect(() => {
    getFriends();
  },[]);

  const [searchBoxToggle, setSearchBoxToggle] = useState(false);
  return (
    <>
    <Header left={'Edit'} center={'Chats'} num={'1'} />
    <main>
      <Search_box searchBoxToggle={searchBoxToggle} />
      <section className='section__friends'>
        <header><h2>Friends</h2></header>
        {isLoading ? <p></p> :
        <ul className='chat_list'>
        {friends.map((friend,index) => <Chatting
                                        key={index}
                                        id={friend.id}
                                        name={friend.name}
                                        message={friend.latest}
                                        profileURL={friend.images}
                                        photoURL={friend.background}
                                        comment={friend.company.catchPhrase} />
          )}
          </ul>
          }
      </section>
    </main>
    <Fa_btn setSearchBoxToggle={setSearchBoxToggle} />
    <Tab chats={`on`} />
    </>
  )
}

export default Chats