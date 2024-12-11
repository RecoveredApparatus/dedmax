import React, { useState } from 'react';
import { Send, Terminal, Shield, Wifi } from 'lucide-react';
import { saveMessage } from '../utils/storage';

export function MessageSender() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSending) {
      setIsSending(true);
      try {
        await saveMessage({
          id: Date.now().toString(),
          content: message,
          timestamp: Date.now(),
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      <div className="scanline absolute inset-0 pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg border border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.3)] p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6" />
            <h1 className="text-xl font-mono glitch" data-text="TRANSMISSION">
              TRANSMISSION
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="w-6 h-6" />
            <Wifi className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-40 bg-black border border-green-500 text-green-500 p-4 rounded font-mono focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
            placeholder="_ENTER_MESSAGE"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending}
            className="flex items-center justify-center w-full bg-green-500 text-black py-2 px-4 rounded font-mono hover:bg-green-400 transition-colors duration-200 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2" />
            <span className="relative z-10">{isSending ? 'TRANSMITTING...' : 'TRANSMIT'}</span>
            <div className="absolute inset-0 bg-green-300 transform translate-y-full transition-transform duration-200 group-hover:translate-y-0"></div>
          </button>
        </form>
      </div>
    </div>
  );
}