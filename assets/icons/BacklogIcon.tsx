import { IconProps } from "@/models";
import React from "react";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

const BacklogIcon = ({ color = "#000", size = 40, ...props }: IconProps) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props}>
      <Line x1={6} y1={8} x2={18} y2={8} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={6} y1={12} x2={14} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={6} y1={16} x2={12} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  </View>
);

export default BacklogIcon;
