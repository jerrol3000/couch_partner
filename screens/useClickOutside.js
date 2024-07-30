import { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.measure) return;

      ref.current.measure((fx, fy, width, height, px, py) => {
        if (
          event.pageX < px ||
          event.pageX > px + width ||
          event.pageY < py ||
          event.pageY > py + height
        ) {
          callback();
        }
      });
    };

    const touchable = ref.current;
    const subscription = Keyboard.addListener(
      "keyboardDidHide",
      handleClickOutside
    );

    return () => {
      subscription.remove();
    };
  }, [ref, callback]);
};

export default useClickOutside;
