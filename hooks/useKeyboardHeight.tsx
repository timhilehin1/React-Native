import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const showSubcription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSubcription.remove();
      hideSubscription.remove();
    };
  }, []);
  return keyboardHeight;
};

export default useKeyboardHeight;
