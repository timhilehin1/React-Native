import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"
const SettingsIcon = (props: SvgProps) => (
 <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-bolt-icon lucide-bolt"
  >
    <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <Circle cx={12} cy={12} r={4} />
  </Svg>
)
export default SettingsIcon
