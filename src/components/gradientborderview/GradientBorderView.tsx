import React, { useMemo, forwardRef } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { getBorderStyles, getStrippedStyle } from './utils/util';

export interface GradientBorderViewProps {
  colors: string[];
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
  onLayout?: ViewProps['onLayout'];
  pointerEvents?: ViewProps['pointerEvents'];
  start?: LinearGradientProps['start'];
  end?: LinearGradientProps['end'];
  locations?: LinearGradientProps['locations'];
  useAngle?: LinearGradientProps['useAngle'];
  angleCenter?: LinearGradientProps['angleCenter'];
  angle?: LinearGradientProps['angle'];
}

export interface GradientBorderViewRef {
  view: View;
}

const GradientBorderView = forwardRef<View, GradientBorderViewProps>(
  (
    {
      children,
      colors,
      style,
      innerContainerStyle,
      pointerEvents,
      onLayout,
      start,
      end,
      locations,
      useAngle,
      angleCenter,
      angle,
    },
    ref,
  ) => {
    const flatStyle = useMemo(
      () => (StyleSheet.flatten(style) || {}) as ViewStyle,
      [style],
    );
    const { radii, borderWidth } = useMemo(
      () => getBorderStyles(flatStyle),
      [flatStyle],
    );

    // Strip border props from style so the outer View doesn't render a native border or double border
    const strippedStyle = useMemo(
      () => getStrippedStyle(flatStyle),
      [flatStyle],
    );

    return (
      <View
        ref={ref}
        onLayout={onLayout}
        pointerEvents={pointerEvents}
        style={[strippedStyle, radii.outer]}
      >
        {/* Gradient border */}
        <MaskedView
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          maskElement={
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderWidth,
                },
                radii.outer,
              ]}
            />
          }
        >
          <LinearGradient
            colors={colors}
            style={StyleSheet.absoluteFill}
            start={start}
            end={end}
            locations={locations}
            useAngle={useAngle}
            angleCenter={angleCenter}
            angle={angle}
          />
        </MaskedView>

        {/* Inner content */}
        {children ? (
          <View
            style={[innerContainerStyle, { margin: borderWidth }, radii.inner]}
          >
            {children}
          </View>
        ) : null}
      </View>
    );
  },
);

export default GradientBorderView;
