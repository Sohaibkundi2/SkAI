"use client";

import { useState } from "react";
import axios from "axios";

export default function Chatbox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: input });
      const fullText: string = res.data?.output ?? "⚠️ No response";

      // Initialize bot message
      let displayed = "";
      setMessages([...newMessages, { role: "bot", text: displayed }]);

      // Streaming effect
      for (let i = 0; i < fullText.length; i++) {
        displayed += fullText[i];
        setMessages([...newMessages, { role: "bot", text: displayed }]);
        await new Promise((r) => setTimeout(r, 20)); // typing speed
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "bot", text: "⚠️ Error: Could not fetch response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-pink-400 p-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-pink-500 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold flex justify-between items-center">
          <span>💬 Sohaib&apos;s Funny AI</span>
          <span className="text-xs opacity-80">Created by Sohaib 😁</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto h-[500px]">
          {messages.length === 0 && (
            <p className="text-center text-zinc-400">Start a conversation ✨</p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && (
                <span className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white">
                  🤖
                </span>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[75%] text-sm md:text-base ${
                  msg.role === "user" ? "bg-pink-600 text-white" : "bg-zinc-800 text-pink-300"
                }`}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <span className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white">
                  👤
                </span>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <span className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white">
                🤖
              </span>
              <span className="animate-pulse">AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t border-pink-500 flex items-center gap-2 bg-zinc-950">
          <input
            type="text"
            className="flex-1 bg-zinc-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
