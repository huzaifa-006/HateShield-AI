import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChatBot}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#6b1a5e',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          💬
        </button>
      )}

      {/* ChatBot Container */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '6px',
            right: '10px',
            width: '400px',
            height: '600px',
            zIndex: 1000,
            boxShadow: '0 0 15px rgba(107, 26, 94, 0.3)',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          {/* Close Button */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1001,
            }}
          >
            <button
              onClick={toggleChatBot}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#6b1a5e',
              }}
            >
              ✕
            </button>
          </div>

          {/* Chatbot Iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/6cLleTJknHGlqnTSNSXyD"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Chat with Lyric Canvas Bot"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ChatBot;
