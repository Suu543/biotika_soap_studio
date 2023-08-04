"use client";

// layout은 SSR, ModalProvider는 CSR, Hydration 오류를 피하고자 다음과 같이 코드를 구성함.
import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
