import { IconProps } from "@/models";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DeleteIcon = (props: IconProps) => {
  return props.focused ? (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M6.5 7h12M9.5 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V7m-8 0 .8 10.5a2 2 0 0 0 2 1.8h3.4a2 2 0 0 0 2-1.8L17.5 7"
        stroke={props.color || "#8A8A8A"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ) : (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M6.5 7h12M9.5 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V7m-8 0 .8 10.5a2 2 0 0 0 2 1.8h3.4a2 2 0 0 0 2-1.8L17.5 7"
        stroke={props.color || "#8A8A8A"}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DeleteIcon;
