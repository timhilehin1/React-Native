import { IconProps } from "@/models";
import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const SomedayIcon = ({ color = "#000", size = 40, ...props }: IconProps) => (
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
      <Path
        d="M15 3a9 9 0 1 0 6 15A8 8 0 0 1 15 3z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default SomedayIcon;
