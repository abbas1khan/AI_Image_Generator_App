import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Check = ({
  size = 24,
  color = '#000000',
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    height={size}
    x={0}
    y={0}
    viewBox="0 0 511.985 511.985"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    className=""
  >
    <G>
      <Path
        d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"
        fill={color}
        opacity={1}
        data-original={color}
        className=""
      />
    </G>
  </Svg>
);

export default Check;
