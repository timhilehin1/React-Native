import { IconProps } from "@/models";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({ color = "#fff", ...props }: IconProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusIcon;
