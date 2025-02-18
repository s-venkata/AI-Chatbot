"use client";

import { useState } from "react";
import { ChatWindow } from "@/components/chat/chat-window";
import { ChatInput } from "@/components/chat/chat-input";
import { ThemeToggle } from "@/components/theme-toggle";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (content: string, file?: File) => {
    // Handle file upload if present
    let fileUrl = "";
    if (file) {
      // Here you would typically upload the file to your server/storage
      // and get back a URL. For now, we'll just add the filename to the message
      fileUrl = `[File: ${file.name}]\n`;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: fileUrl + content,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <ThemeToggle />
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center py-8 text-foreground">
          What can I help with?
        </h1>
        
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSendMessage} />
      </div>
    </main>
  );
}