import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: Math.max(insets.left, 20),
        paddingRight: Math.max(insets.right, 20),
        paddingTop: Math.max(insets.top),
      }}
      className={`flex-1 bg-appBackground py-4 ${className || ""}`}
    >
      {children}
    </View>
  );
};

export default Container;
