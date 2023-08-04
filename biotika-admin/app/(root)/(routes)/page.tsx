"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage = () => {
  // useEffect에서 정상적으로 작동하지 않을 수 있기 때문에
  // const storeModal = useStoreModal();

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    console.log("SetupPage Component");

    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  // Modal Trigger가 목적이기 때문에
  return null;
};

export default SetupPage;
