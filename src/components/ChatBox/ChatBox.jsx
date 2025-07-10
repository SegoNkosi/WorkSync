import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import assets from '../../assets/assets';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message && !image) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      image: image ? URL.createObjectURL(image) : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className='chat-box'>
      
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Bonko Khoza <img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

      
      <div className="chat-msg" style={{ overflowY: 'auto', maxHeight: '400px' }}>
        {messages.map(msg => (
          <div className={msg.sender === 'me' ? 'r-msg' : 's-msg'} key={msg.id}>
            {msg.text && <p className='msg'>{msg.text}</p>}
            {msg.image && <img className='msg-img' src={msg.image} alt="sent" />}
            <div>
              <img src={assets.profile_danny} alt="user" />
              <p>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      
      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden onChange={handleImageChange} />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='Upload' />
        </label>
        <img src={assets.send_button} alt='Send' onClick={handleSend} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export default ChatBox;
