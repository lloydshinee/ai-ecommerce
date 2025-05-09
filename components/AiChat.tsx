"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse } from "@/lib/ai";
import AiResponse from "./AiResponse";

interface Message {
  role: string;
  text: string;
}

export default function AiChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 100);
    }
  }, [isChatOpen]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = { role: "user", text: newMessage };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    const response = await generateResponse(newMessage);
    if (response) {
      const aiResponse = {
        role: "model",
        text: response,
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      // Delay scrolling to allow DOM update
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsChatOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-full sm:w-96 md:w-120 bg-white shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-indigo-700 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((msg, index) =>
                    msg.role === "user" ? (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index % 3) }}
                        className="flex justify-end"
                      >
                        <div className="max-w-3/4 p-3 rounded-lg bg-indigo-600 text-white rounded-br-none">
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <AiResponse key={index} message={msg} />
                    )
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-2">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                    rows={1}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ""}
                    className="p-2 bg-indigo-600 text-white rounded-full disabled:opacity-50"
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
