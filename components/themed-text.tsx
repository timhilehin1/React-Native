import React from "react";
import { Text, TextProps } from "react-native";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "caption"
  | "label";

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  size?: number;
  font?: string;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "text-4xl font-interBold text-dark",
  h2: "text-3xl font-interBold text-dark",
  h3: "text-2xl font-interSemiBold text-dark",
  h4: "text-xl font-interSemiBold text-dark",
  body: "text-base font-interRegular text-dark",
  bodyLarge: "text-lg font-interRegular text-dark",
  bodySmall: "text-sm font-interRegular text-dark",
  caption: "text-xs font-interRegular text-dark",
  label: "text-sm font-interMedium text-dark",
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  color,
  size,
  font,
  className = "",
  style,
  children,
  ...props
}) => {
  const baseClass = variantStyles[variant];

  // If custom font is provided, remove the default font class
  let finalClassName = baseClass;
  if (font) {
    // Remove existing font-* class and add custom font
    finalClassName = baseClass.replace(/font-\w+/, font);
  }

  const combinedClassName = `${finalClassName} ${className}`.trim();

  const customStyle = {
    ...(color && { color }),
    ...(size && { fontSize: size }),
    ...(style || {}),
  };

  return (
    <Text className={combinedClassName} style={customStyle} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
