import { useEffect, useRef, useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export const useCustomModalBackHandler = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      if (isModalOpen) {
        closeModal(); // Ferme la modal si elle est ouverte
        return true; // Empêche le comportement par défaut
      }
      return false; // Permet le comportement par défaut
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [isModalOpen, closeModal]);

  return { bottomSheetModalRef, isModalOpen, openModal, closeModal };
};
