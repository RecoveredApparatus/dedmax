import React, { useState } from 'react';
import { PasswordProtected } from './components/PasswordProtected';
import { MessageSender } from './components/MessageSender';
import { MessageReceiver } from './components/MessageReceiver';

const SENDER_PASSWORD = 'Bravo';
const RECEIVER_PASSWORD = 'Alpha';

function App() {
  const [view, setView] = useState<'login' | 'sender' | 'receiver'>('login');

  const handlePasswordSubmit = (inputPassword: string) => {
    if (inputPassword === SENDER_PASSWORD) {
      setView('sender');
    } else if (inputPassword === RECEIVER_PASSWORD) {
      setView('receiver');
    }
    return inputPassword === SENDER_PASSWORD || inputPassword === RECEIVER_PASSWORD;
  };

  if (view === 'sender') {
    return <MessageSender />;
  }

  if (view === 'receiver') {
    return <MessageReceiver />;
  }

  return (
    <PasswordProtected
      onPasswordSubmit={handlePasswordSubmit}
    />
  );
}

export default App;