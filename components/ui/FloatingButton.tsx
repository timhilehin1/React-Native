import PlusIcon from "@/assets/icons/PlusIcon";
import React from "react";
import { TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";
interface FloatingButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  className?: string;
  bottomOffset?: number;
  hint?:string;
  label?:string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon,
  className,
  bottomOffset = 24,
  label,
  hint
}) => {
  return (
    <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={label}
    accessible
    accessibilityHint={hint}
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: bottomOffset,
        zIndex: 999,
      }}
      className={twMerge(
        "absolute bottom-6 right-6 bg-primary w-[5.375rem] h-[5.375rem] rounded-full justify-center items-center shadow-md",
        className
      )}
    >
      {icon ?? <PlusIcon color="#fff" width={30} height={30} />}
    </TouchableOpacity>
  );
};

export default FloatingButton;
