"use client";

import { useState, useEffect, RefObject } from "react";

export function useScrollPosition(scrollRef: RefObject<HTMLDivElement>) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setShowScrollButton(!isNearBottom);
      setAutoScroll(isNearBottom);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return {
    showScrollButton,
    autoScroll,
    setAutoScroll
  };
}