import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Variant = "primary" | "dark" | "danger" | "light" | "ghost";
type Fill = "solid" | "outline" | "clear";
type Size = "sm" | "md" | "lg";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  fill?: Fill;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showPattern?: boolean;
}

const buttonColorObject = {
  primary: {
    solid: {
      bg: "bg-primary",
      text: "text-white",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-primary",
    },
    outline: {
      bg: "bg-white",
      text: "text-primary",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-primary",
    },
    clear: {
      bg: "bg-transparent",
      text: "text-primary",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
  },
  dark: {
    solid: {
      bg: "bg-dark",
      text: "text-white",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-dark",
    },
    outline: {
      bg: "bg-white",
      text: "text-dark",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-dark",
    },
    clear: {
      bg: "bg-transparent",
      text: "text-dark",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
  },
  light: {
    solid: {
      bg: "bg-[#F5F5F5]",
      text: "text-[#303030]",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-[#F5F5F5]",
    },
    outline: {
      bg: "bg-transparent",
      text: "text-[#F5F5F5]",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-[#F5F5F5]",
    },
    clear: {
      bg: "bg-transparent",
      text: "text-[#F5F5F5]",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
  },
  ghost: {
    solid: {
      bg: "bg-transparent",
      text: "text-primary",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
    outline: {
      bg: "bg-transparent",
      text: "text-primary",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
    clear: {
      bg: "bg-transparent",
      text: "text-primary",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
  },
  danger: {
    solid: {
      bg: "bg-[#FEE9E8]",
      text: "text-[#8E1F0B]",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-[#FEE9E8]",
    },
    outline: {
      bg: "bg-transparent",
      text: "text-[#FEE9E8]",
      disabledBg: "bg-[#DBDBDB]",
      disabledText: "text-[#9E9E9E]",
      border: "border border-[#FEE9E8]",
    },
    clear: {
      bg: "bg-transparent",
      text: "text-[#FEE9E8]",
      disabledBg: "bg-transparent",
      disabledText: "text-[#9E9E9E]",
      border: "border border-transparent",
    },
  },
};

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const {
    title,
    onPress,
    variant = "primary",
    fill = "solid",
    size = "lg",
    disabled = false,
    loading = false,
    rightIcon = null,
    leftIcon = null,
    showPattern = true,
  } = props;

  const baseClasses = "flex-1 w-full rounded-full";
  const textBase = "font-interSemiBold";

  // sizes
  const sizeMap: Record<Size, { height: string; text: string; px: string }> = {
    sm: { height: "h-10", text: "text-xs", px: "px-4" }, // 40px
    md: { height: "h-12", text: "text-sm", px: "px-5" }, // 48px
    lg: { height: "h-14", text: "text-base", px: "px-6" }, // 56px
  };

  const { height, text, px } = sizeMap[size];

  let content;
  let containerClasses = "";
  let textClasses = "";
  const buttonColor = buttonColorObject[variant][fill];

  containerClasses = `${baseClasses} ${height} ${px} ${disabled ? "border border-transparent" : buttonColor.border} ${
    disabled ? buttonColor.disabledBg : buttonColor.bg
  }`;
  textClasses = `${textBase} ${text} ${
    disabled ? buttonColor.disabledText : buttonColor.text
  }`;
  content = (
    <ButtonContent
      {...props}
      containerClasses={containerClasses}
      textClasses={textClasses}
    />
  );

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.7}
      className={`h-auto flex-row ${loading ? "opacity-50" : ""}`}
    >
      {content}
    </TouchableOpacity>
  );
};

export default CustomButton;

const ButtonContent: React.FC<{
  containerClasses: string;
  textClasses: string;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showPattern?: boolean;
  variant?: Variant;
  fill?: Fill;
}> = (props) => {
  const {
    containerClasses,
    textClasses,
    title,
    disabled,
    loading,
    rightIcon,
    leftIcon,
    showPattern = true,
    fill = "solid",
    variant = "primary",
  } = props;

  const shouldAddBoxShadow =
    variant === "primary" && fill === "solid" && !disabled;

  return (
    <View
      style={{
        ...(shouldAddBoxShadow && {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 6,
        }),
        position: "relative",
        overflow: "hidden",
      }}
      className={containerClasses}
    >
      <View className="flex-1 flex-row items-center justify-center gap-x-4 relative ">
        {leftIcon}
        <Text className={textClasses}>{title}</Text>
        {loading ? <ActivityIndicator color="white" /> : rightIcon}
      </View>
      {/* {(showPattern && variant === "primary") && <ButtonBackground style={{ position: 'absolute', right: 10, top: 0, zIndex: -1 }} color={"rgba(255, 255, 255, 0.10)"} />} */}
    </View>
  );
};
