import { IconProps } from "@/models";
import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const SubTaskIcon = ({ color = "#fff", ...props }: IconProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      {/* Main task circle */}
      <Circle
        cx={6}
        cy={7}
        r={1.5}
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtask circle */}
      <Circle
        cx={10}
        cy={15}
        r={1.5}
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Connection line */}
      <Path
        d="M6 7V15H8"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />

      {/* Task lines */}
      <Path
        d="M12 7H20"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Path
        d="M14 15H20"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SubTaskIcon;
