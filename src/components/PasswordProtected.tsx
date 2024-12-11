import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wifi } from 'lucide-react';

interface PasswordProtectedProps {
  onPasswordSubmit: (password: string) => boolean;
}

export function PasswordProtected({ onPasswordSubmit }: PasswordProtectedProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(false);
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = onPasswordSubmit(inputPassword);
    if (!isValid) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      <div className="scanline absolute inset-0 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg border border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.3)] relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Shield className="w-6 h-6 text-green-500" />
          <Wifi className="w-6 h-6 text-green-500 animate-pulse" />
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Terminal className="w-6 h-6" />
          <h2 className="text-xl font-mono glitch" data-text="SYSTEM ACCESS">
            SYSTEM ACCESS
          </h2>
        </div>

        <div className="font-mono text-sm mb-6 opacity-70">
          <p>{'>'} Initializing security protocol{dots}</p>
          <p>{'>'} Awaiting authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full bg-black border border-green-500 text-green-500 px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="_ENTER_PASSWORD"
            />
            {error && (
              <p className="text-red-500 font-mono text-sm mt-2">
                {'>'} ACCESS_DENIED: Invalid authentication code
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 px-4 rounded font-mono hover:bg-green-400 transition-colors duration-200 relative overflow-hidden group"
          >
            <span className="relative z-10">AUTHENTICATE</span>
            <div className="absolute inset-0 bg-green-300 transform translate-y-full transition-transform duration-200 group-hover:translate-y-0"></div>
          </button>
        </form>
      </div>
    </div>
  );
}