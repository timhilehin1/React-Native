import { IconProps } from "@/models";
import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const CircularIcon = ({ color = "#fff", ...props }: IconProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CircularIcon;
