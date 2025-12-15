import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"
const NotebookIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={30}
    height={30}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-notebook-icon lucide-notebook"
  >
    <Path d="M2 6h4M2 10h4M2 14h4M2 18h4" />
    <Rect width={16} height={20} x={4} y={2} rx={2} />
    <Path d="M16 2v20" />
  </Svg>
)
export default NotebookIcon