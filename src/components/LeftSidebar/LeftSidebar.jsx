import React from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = () => {
  const navigate = useNavigate();

  // Dummy contact data – you can replace with real data later
  const contacts = [
    {
      id: 1,
      name: 'Bonko Khoza',
      lastMessage: 'Hello, how are you?',
      avatar: assets.profile_img,
    },
    {
      id: 2,
      name: 'Hloni Mokoena',
      lastMessage: 'Can you check Trello?',
      avatar: assets.profile_hloni,
    },
    {
      id: 3,
      name: 'Chike Ochieng',
      lastMessage: 'I uploaded the document.',
      avatar: assets.profile_chike,
    },
    {
      id: 4,
      name: 'Rasheeda Yusuf',
      lastMessage: 'Thanks for the update!',
      avatar: assets.profile_rasheeda,
    }
  ];

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')}>Edit profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder='Search here...' />
        </div>
      </div>

      <div className="ls-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="friends">
            <img src={contact.avatar} alt={contact.name} />
            <div>
              <p>{contact.name}</p>
              <span>{contact.lastMessage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
