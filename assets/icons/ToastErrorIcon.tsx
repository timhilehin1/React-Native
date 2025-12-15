import * as React from "react"
import Svg, {
    ClipPath,
    Defs,
    G,
    LinearGradient,
    Path,
    Rect,
    Stop,
    SvgProps,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const ToastErrorIcon = (props: SvgProps) => (
  <Svg
    width={54}
    height={49}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <G clipPath="url(#b)">
        <Rect width={40} height={40} x={7} y={2} fill="#E51C00" rx={20} />
        <Rect
          width={40}
          height={40}
          x={7}
          y={2}
          fill="url(#c)"
          fillOpacity={0.4}
          rx={20}
        />
        <G filter="url(#d)">
          <Path
            fill="#fff"
            d="M27 11.25c5.937 0 10.75 4.813 10.75 10.75S32.937 32.75 27 32.75 16.25 27.937 16.25 22 21.063 11.25 27 11.25Zm0 13.738a1 1 0 0 0-1 1v.01a1 1 0 1 0 2 0v-.01a1 1 0 0 0-1-1ZM27 17a1 1 0 0 0-1 1v4.5a1 1 0 1 0 2 0V18a1 1 0 0 0-1-1Z"
          />
        </G>
      </G>
      <Rect
        width={39.5}
        height={39.5}
        x={7.25}
        y={2.25}
        stroke="#DD270E"
        strokeWidth={0.5}
        rx={19.75}
      />
    </G>
    <Defs>
      <LinearGradient
        id="c"
        x1={27}
        x2={27}
        y1={4.917}
        y2={28.25}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0.5} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <ClipPath id="b">
        <Rect width={40} height={40} x={7} y={2} fill="#fff" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ToastErrorIcon
