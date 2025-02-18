"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollButton } from "./scroll-button";
import { useScrollPosition } from "@/hooks/use-scroll-position";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatWindowProps {
  messages: Message[];
}

export function ChatWindow({ messages }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { showScrollButton, autoScroll } = useScrollPosition(scrollRef);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  return (
    <div className="flex-1 overflow-hidden relative">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div ref={scrollRef} className="max-w-3xl mx-auto py-4 space-y-6 px-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              isUser={message.isUser}
            />
          ))}
        </div>
      </ScrollArea>
      <ScrollButton visible={showScrollButton} onClick={scrollToBottom} />
    </div>
  );
}