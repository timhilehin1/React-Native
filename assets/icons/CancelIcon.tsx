import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const CancelIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || "#141B34"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 6 6 18m12 0L6 6"
    />
  </Svg>
)
export default CancelIcon
