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
const ToastSuccessIcon = (props: SvgProps) => (
  <Svg
    width={54}
    height={49}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <G clipPath="url(#b)">
        <Rect width={40} height={40} x={7} y={2} fill="#339E3B" rx={20} />
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
            fill="url(#e)"
            fillRule="evenodd"
            d="M26.749 32.499c-5.937 0-10.75-4.813-10.75-10.75s4.813-10.75 10.75-10.75 10.75 4.813 10.75 10.75-4.813 10.75-10.75 10.75Zm4.768-13.11a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6Z"
            clipRule="evenodd"
          />
        </G>
      </G>
      <Rect
        width={39.5}
        height={39.5}
        x={7.25}
        y={2.25}
        stroke="#33A93C"
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
      <LinearGradient
        id="e"
        x1={26.749}
        x2={26.749}
        y1={10.999}
        y2={32.499}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#FAFAFA" />
      </LinearGradient>
      <ClipPath id="b">
        <Rect width={40} height={40} x={7} y={2} fill="#fff" rx={20} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ToastSuccessIcon
