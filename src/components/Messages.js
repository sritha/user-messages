/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getMessages } from '../data';
import { Link } from 'react-router-dom';

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages().then((res) => setMessages(res));
  }, []);
  const data = messages.filter((message) => message.userId === props.match.params.userId);

  return (
    <div className="user-messages">
      {data &&
        data.map((message) => {
          return (
            <div className="message" key={message.message}>
              <div>
                <span>{message.message}</span>
                <div className="date">{new Date(message.timestamp).toUTCString()}</div>
              </div>
            </div>
          );
        })}

      <button>
        {' '}
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
};

export default Messages;
