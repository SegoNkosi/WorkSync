import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'

    function ChatBox() {
        return (
            <div className='chat-box'>

                <div className="chat-user">
                    <img src={assets.profile_image} alt="" />
                </div>
            </div>
        )
    }

export default ChatBox