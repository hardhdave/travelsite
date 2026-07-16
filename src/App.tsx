import React from 'react';
import { ChatPopup } from './components/ChatPopup';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Mock Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
            SH
          </div>
          <span className="font-bold text-gray-900">Shred Himalayas</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600 font-medium">
          <a href="#home" className="hover:text-gray-900">Home</a>
          <a href="#adventures" className="hover:text-gray-900">Adventures</a>
          <a href="#packages" className="hover:text-gray-900">Packages</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Book Expedition
        </button>
      </header>

      {/* Mock Body Content */}
      <main className="flex-1 max-w-4xl mx-auto py-12 px-6 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Experience the Himalayas Beyond the Ordinary
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
          Premium custom tours, private trekking expeditions, and luxury ski adventures designed and guided by local experts in Kashmir and Ladakh.
        </p>
        <div className="flex gap-4">
          <a
            href="#adventures"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
          >
            Explore Adventures
          </a>
          <a
            href="#packages"
            className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Custom Packages
          </a>
        </div>
      </main>

      {/* Mock Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 border-t border-gray-800 text-center text-sm">
        <p>© 2026 Shred Himalayas. All rights reserved.</p>
      </footer>

      {/* The Floating WhatsApp Chat Popup Component */}
      <ChatPopup
        title="Planning a trip? Ask a local."
        description="Hey, I'm Akash. Planning Himalayan passes and stays can get overwhelming. Let's sketch a calm, custom route on WhatsApp."
        buttonText="CHAT WITH AKASH"
        whatsappLink="https://wa.me/1234567890"
        avatarImage="assets/images/akash-avatar.jpg"
      />
    </div>
  );
}

export default App;
