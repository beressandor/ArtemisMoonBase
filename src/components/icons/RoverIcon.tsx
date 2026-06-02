import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

interface RoverIconProps {
  color: string;
  size?: number;
  strokeWidth?: number;
}

export function RoverIcon({ color, size = 24, strokeWidth = 2 }: RoverIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.2 10.4 9.1 7h5.1l2.2 3.4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x="5"
        y="10"
        width="11.2"
        height="5.1"
        rx="1.4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.6 7.1 19 4.8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="20.1" cy="4" r="1.3" stroke={color} strokeWidth={strokeWidth} />
      <Line
        x1="6.4"
        y1="17.6"
        x2="18.7"
        y2="17.6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Circle cx="7.3" cy="18.2" r="2" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="16.8" cy="18.2" r="2" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}
