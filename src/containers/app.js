import React, { useEffect, useState } from 'react';
import { getMembers, getMessages } from '../data';
import { Link } from 'react-router-dom';

export const App = () => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeMessageId, setActiveMessageId] = useState('');
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    getMessages().then((res) => setMessages(res));
    getMembers().then((res) => setMembers(res));
  }, []);

  const data = messages.map((message) => {
    const member = members.filter((member) => member.id === message.userId);
    if (member) {
      return { ...message, member: member[0] }
    }else {
      return message;
    }
  }).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

  

  const handleEmail = (id) => {
    setShowEmail(true);
    setActiveMessageId(id);
  }

  return (
    <main className='messages'>
      <ul>
        {data &&
          data.slice(1,10).map((message) => {
            return (
              <>
                <div className='message'
                  key={message.id}
                  onMouseEnter={() => handleEmail(message.id)}
                  onMouseLeave={() => setShowEmail(false)}
                >
                  {message.member && <img alt={message.member.firstName} src={message.member.avatar} />}
                  <div>
                  <span>{message.message}</span>
                  {message.member && <div><Link to={'user/'+message.userId} >{message.member.firstName} {message.member.lastName}</Link></div>}
                  <div className='date'>{new Date(message.timestamp).toUTCString()}</div>
                  </div>
                  {showEmail && message.member && (activeMessageId === message.id) && <div className='email'>{message.member.email}</div>}
                </div>
              </>
            );
          })}
      </ul>
    </main>
  );
};

export default App;
