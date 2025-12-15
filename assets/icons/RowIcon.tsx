import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"
const RowIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={30}
    height={30}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-rows2-icon lucide-rows-2"
  >
    <Rect width={18} height={18} x={3} y={3} rx={2} />
    <Path d="M3 12h18" />
  </Svg>
)
export default RowIcon
