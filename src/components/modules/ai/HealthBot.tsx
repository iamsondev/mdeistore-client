"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithAIAction } from "@/actions/admin.action";

export function HealthBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hello! I am MediBot, your virtual health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await chatWithAIAction(userMsg);
      
      if (res?.data?.success) {
        setMessages(prev => [...prev, { role: "bot", text: res.data.data }]);
      } else {
        const errorMsg = res?.data?.message || res?.error?.message || "I'm experiencing some technical difficulties right now.";
        setMessages(prev => [...prev, { role: "bot", text: errorMsg }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-primary to-[#1B4D3E] text-white shadow-2xl shadow-primary/30 z-50 transition-opacity border border-white/10 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] shadow-2xl rounded-2xl overflow-hidden bg-card border border-border z-50 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-[#1B4D3E] p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                   <Bot className="h-5 w-5" />
                </div>
                <div>
                   <h3 className="font-bold text-sm">MediBot</h3>
                   <div className="flex items-center gap-1.5 opacity-80 text-[10px] uppercase font-bold tracking-widest">
                      <div className="h-1.5 w-1.5 bg-[#FF6B35] rounded-full animate-pulse" /> Online
                   </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-auto">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`px-4 py-2 text-sm rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-primary text-white rounded-br-sm" 
                      : "bg-white dark:bg-zinc-800 border border-border rounded-bl-sm shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start gap-2">
                   <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                     <Bot className="h-4 w-4" />
                   </div>
                   <div className="px-4 py-3 bg-white dark:bg-zinc-800 border border-border rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
                     <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                     <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                     <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-card border-t shrink-0">
               <form 
                 onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                 className="flex items-center gap-2 relative"
               >
                 <input
                    type="text"
                    placeholder="Ask MediBot..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all pr-12"
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 p-2 bg-primary text-white rounded-full hover:bg-[#FF6B35] disabled:opacity-50 transition-colors"
                  >
                   <Send className="h-4 w-4 ml-0.5" />
                 </button>
               </form>
               <p className="text-[9px] text-center mt-2 text-muted-foreground uppercase tracking-widest font-black">AI can make mistakes. Verify medical info.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
