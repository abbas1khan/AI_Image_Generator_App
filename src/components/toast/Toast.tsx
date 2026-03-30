import React, { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useToastAnimation } from './useToastAnimation';
import type { ToastConfig, ToastRef } from './types';
import { VARIANTS } from './variants';
export type { ToastConfig, ToastRef } from './types';
export { ToastVariant } from './types';

/** Base inset from the bottom edge (above home indicator / nav). */
const BASE_TOAST_BOTTOM = 24;
const DEFAULT_TOAST_Z_INDEX = 1000;

type ToastCardProps = {
  config: ToastConfig;
  onClose: () => void;
};

const ToastCard = memo(({ config, onClose }: ToastCardProps) => {
  const theme = VARIANTS[config.variant];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.background,
          borderColor: theme.borderColor,
        },
      ]}
    >
      <View style={[styles.accentBar, { backgroundColor: theme.accentLeft }]} />

      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: theme.iconBackground,
            borderColor: theme.borderColor,
          },
        ]}
      >
        <Text style={[styles.iconText, { color: theme.titleColor }]}>
          {theme.icon}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.titleColor }]}>
          {config.title}
        </Text>
        {config.description ? (
          <Text style={[styles.description, { color: theme.descColor }]}>
            {config.description}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onClose}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.closeBtn}
        accessibilityRole="button"
        accessibilityLabel="Dismiss notification"
      >
        <Text style={[styles.closeText, { color: theme.descColor }]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
});

ToastCard.displayName = 'ToastCard';

const Toast = forwardRef<ToastRef>((_, ref) => {
  const {
    config,
    visible,
    showToast,
    hideToast,
    animatedStyle,
    handleOnLayout,
  } = useToastAnimation();

  useImperativeHandle(
    ref,
    () => ({
      show: showToast,
      hide: hideToast,
    }),
    [hideToast, showToast],
  );

  const a11yLabel = useMemo(() => {
    if (!config) return undefined;
    return config.description
      ? `${config.title}. ${config.description}`
      : config.title;
  }, [config]);

  if (!visible || !config) return null;

  const bottomInset = Number.isFinite(config.verticalOffset)
    ? (config.verticalOffset as number)
    : BASE_TOAST_BOTTOM;

  const zIndex = Number.isFinite(config.zIndex)
    ? (config.zIndex as number)
    : DEFAULT_TOAST_Z_INDEX;

  return (
    <Animated.View
      style={[styles.wrapper, { bottom: bottomInset, zIndex }, animatedStyle]}
      onLayout={handleOnLayout}
      pointerEvents="box-none"
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={a11yLabel}
    >
      <ToastCard config={config} onClose={hideToast} />
    </Animated.View>
  );
});

export default Toast;

Toast.displayName = 'Toast';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    elevation: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 14,
    paddingRight: 14,
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
    marginRight: 12,
    borderRadius: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 2,
    lineHeight: 18,
  },
  closeBtn: {
    paddingLeft: 12,
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
