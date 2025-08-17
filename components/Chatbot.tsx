"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

type Message = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: input });
      const assistantText: string = res.data.reply;

      // Streaming effect
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages(prev => [...prev, assistantMessage]);

      let i = 0;
      const interval = setInterval(() => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantText.slice(0, i + 1);
          return newMessages;
        });
        i++;
        if (i >= assistantText.length) clearInterval(interval);
      }, 200); // typing speed
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "Error: Could not get a response." }]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="h-72 overflow-y-auto p-4 border rounded-lg bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-2 rounded-lg max-w-xs break-words ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
              <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
          className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
