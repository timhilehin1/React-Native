import { IconProps } from "@/models";
import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const TomorrowIcon = ({ color = "#000", size = 40, ...props }: IconProps) => (
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
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M10 8l4 4-4 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  </View>
);

export default TomorrowIcon;
