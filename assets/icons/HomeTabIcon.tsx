import Svg, { Path, SvgProps } from "react-native-svg";

type HomeTabIconProps = SvgProps & {
  focused: boolean;
};

const HomeTabIcon = ({ focused, ...props }: HomeTabIconProps) => (
  <Svg
    {...props}
    width={27}
    height={27}
    stroke={focused ? "#83c5f1" : "currentColor"}   // example usage
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  >
    <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <Path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);

export default HomeTabIcon;
