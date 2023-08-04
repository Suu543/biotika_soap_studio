"use client";

// 참조 useEffect를 사용하는 이유

import { useState, useEffect } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    // Hydration Trick을 목적으로 사용
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;
};
