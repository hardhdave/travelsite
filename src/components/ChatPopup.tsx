import React, { useState, useEffect, useRef } from 'react';

export interface ChatPopupProps {
  /** Heading displayed at the top of the chat text area */
  title?: string;
  /** Main description or welcome message */
  description?: string;
  /** Label for the green CTA button */
  buttonText?: string;
  /** The WhatsApp link (e.g., https://wa.me/9999999999) */
  whatsappLink?: string;
  /** Optional URL to a custom avatar image. If not provided, a default avatar is shown. */
  avatarImage?: string;
}

export const ChatPopup: React.FC<ChatPopupProps> = ({
  title = 'Planning a trip? Ask a local.',
  description = "Hey, I'm Akash. Planning Himalayan passes and stays can get overwhelming. Let's sketch a calm, custom route on WhatsApp.",
  buttonText = 'CHAT WITH US',
  whatsappLink = 'https://wa.me/9999999999',
  avatarImage = 'assets/images/akash-avatar.jpg',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPopup = () => {
    setIsVisible(true);
  };

  const hidePopup = () => {
    setIsVisible(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a timer to show the popup again after 5 minutes (300,000 milliseconds)
    timerRef.current = setTimeout(() => {
      showPopup();
    }, 5 * 60 * 1000);
  };

  useEffect(() => {
    // Initial display after 5 seconds on mount
    timerRef.current = setTimeout(() => {
      showPopup();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    hidePopup();
  };

  const handleChatClick = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    hidePopup();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-popup-title"
      className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] z-50
        bg-white rounded-[20px] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100
        transition-all duration-300 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-[30px] scale-95 pointer-events-none'}
      `}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close chat popup"
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Main Content Area */}
      <div className="flex items-start gap-4 mb-5 mr-4">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          {avatarImage ? (
            <img
              src={avatarImage}
              alt="Local Guide Avatar"
              className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
            />
          ) : (
            // Default avatar image (Stanzin style default Yak / Local SVG profile)
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-100 to-green-200 flex items-center justify-center border border-green-300 shadow-sm">
              <svg
                className="w-7 h-7 text-green-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          )}
          {/* Online green indicator dot */}
          <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h2
            id="chat-popup-title"
            className="text-base font-semibold text-gray-900 leading-tight mb-1"
          >
            {title}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed font-normal break-words">
            {description}
          </p>
        </div>
      </div>

      {/* WhatsApp Full-width CTA Button */}
      <button
        onClick={handleChatClick}
        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium py-3 px-4 rounded-xl
          flex items-center justify-center gap-2 shadow-md shadow-green-100
          transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.597-1.002-5.04-2.83-6.87-1.828-1.827-4.266-2.83-6.866-2.831-5.407 0-9.809 4.399-9.813 9.803-.002 1.703.447 3.364 1.3 4.814l-1.018 3.718 3.823-1.002zm11.378-5.07c-.276-.138-1.636-.807-1.89-.899-.253-.093-.437-.138-.621.138-.184.276-.713.899-.874 1.084-.16.184-.322.207-.598.069-.276-.138-1.168-.43-2.223-1.372-.821-.733-1.375-1.639-1.536-1.916-.16-.276-.017-.425.121-.562.124-.124.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.621-1.496-.85-2.048-.224-.54-.447-.466-.621-.475-.16-.009-.345-.01-.529-.01-.184 0-.483.069-.736.345-.253.276-.966.943-.966 2.3 0 1.357.988 2.667 1.126 2.85.138.184 1.944 2.969 4.71 4.161.657.284 1.17.453 1.57.58.66.21 1.26.18 1.73.11.528-.078 1.637-.67 1.867-1.319.23-.65.23-1.208.161-1.319-.069-.111-.253-.184-.529-.322z" />
        </svg>
        <span>{buttonText}</span>
      </button>
    </div>
  );
};
