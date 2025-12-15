import { IconProps } from "@/models";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ChevronUpIcon = ({ color = "#fff", ...props }: IconProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 19V5M5 12l7-7 7 7"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronUpIcon;
