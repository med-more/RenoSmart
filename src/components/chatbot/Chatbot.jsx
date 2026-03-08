import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const getBotResponse = (message) => {
  const text = (message || '').toLowerCase().trim();
  if (!text) {
    return "Bonjour ! Je suis l'assistant RenoSmart. Posez-moi une question sur la rénovation, les devis ou nos services.";
  }
  if (text.includes('devis') || text.includes('estimation') || text.includes('prix') || text.includes('budget')) {
    return "Vous pouvez demander un devis gratuit en remplissant notre formulaire en ligne. Allez dans la section « Demande de devis » ou cliquez sur « Devis » dans le menu. Nous vous recontacterons avec une estimation personnalisée.";
  }
  if (text.includes('rénovation') || text.includes('travaux') || text.includes('peinture') || text.includes('carrelage') || text.includes('plomberie') || text.includes('électricité')) {
    return "RenoSmart accompagne tous types de travaux : rénovation complète, peinture, carrelage, plomberie, électricité, extension, aménagement. Décrivez-nous votre projet via le formulaire de devis pour une première estimation.";
  }
  if (text.includes('contact') || text.includes('téléphone') || text.includes('email') || text.includes('joindre')) {
    return "Vous pouvez nous joindre par le formulaire Contact, par téléphone, ou en demandant un devis. Consultez la page Contact pour toutes nos coordonnées.";
  }
  if (text.includes('bonjour') || text.includes('salut') || text.includes('coucou')) {
    return "Bonjour ! Comment puis-je vous aider pour votre projet de rénovation ?";
  }
  if (text.includes('merci')) {
    return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.";
  }
  if (text.includes('au revoir') || text.includes('bye')) {
    return "Au revoir ! À bientôt pour votre projet RenoSmart.";
  }
  return "Je peux vous renseigner sur les devis, les types de travaux (rénovation, peinture, plomberie, etc.) et comment nous contacter. Que souhaitez-vous savoir ?";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Bonjour ! Je suis l'assistant RenoSmart. Posez-moi une question sur la rénovation ou les devis." },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputValue('');
    const botText = getBotResponse(text);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: botText }]);
    }, 400);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-[60] overflow-hidden"
          >
            <div className="bg-teal text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold">Assistant RenoSmart</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[320px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-teal text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Votre message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal text-white px-4 py-2 rounded-xl font-medium hover:bg-teal-dark transition-colors text-sm"
              >
                Envoyer
              </button>
            </form>
            <div className="px-3 pb-2">
              <Link
                to="/devis"
                className="text-xs text-teal hover:underline font-medium"
              >
                → Demander un devis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-orange text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-orange-dark transition-colors "
        aria-label="Ouvrir le chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>
    </>
  );
};

export default Chatbot;
