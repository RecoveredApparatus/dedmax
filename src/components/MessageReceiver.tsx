import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Wifi, MessageSquare } from 'lucide-react';
import { Message } from '../types/message';
import { getMessages, subscribeToMessages } from '../utils/storage';

export function MessageReceiver() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initial fetch
    getMessages().then(setMessages);

    // Subscribe to real-time updates
    const subscription = subscribeToMessages(setMessages);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      <div className="scanline absolute inset-0 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg border border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.3)] p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6" />
            <h1 className="text-xl font-mono glitch" data-text="INTERCEPTED">
              INTERCEPTED
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="w-6 h-6" />
            <Wifi className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 font-mono opacity-50">
              <MessageSquare className="w-12 h-12 mx-auto mb-2" />
              <p>{'>'} NO_TRANSMISSIONS_FOUND</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="bg-black border border-green-500 rounded p-4 font-mono"
              >
                <div className="flex items-center justify-between text-xs opacity-50 mb-2">
                  <span>{'>'} MSG_ID: {message.id}</span>
                  <span>{'>'} TIMESTAMP: {new Date(message.timestamp).toLocaleString()}</span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}