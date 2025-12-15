import { IconProps } from "@/models";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CheckIcon = ({ color = "#fff", ...props }: IconProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5 12.5L10 17L19 8"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;