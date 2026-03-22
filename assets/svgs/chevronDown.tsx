import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ChevronDown = ({
  color = '#000000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    height={size}
    x={0}
    y={0}
    viewBox="0 0 32 32"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    className=""
  >
    <G transform="matrix(1.3900000000000001,0,0,1.3900000000000001,-6.236472773551945,-6.63000000000001)">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M4.94 10.94a1.5 1.5 0 0 1 2.12 0L16 19.878l8.94-8.94a1.5 1.5 0 0 1 2.12 2.122l-10 10a1.5 1.5 0 0 1-2.12 0l-10-10a1.5 1.5 0 0 1 0-2.122z"
        clipRule="evenodd"
        opacity={1}
        data-original={color}
        className=""
      />
    </G>
  </Svg>
);
export default ChevronDown;
