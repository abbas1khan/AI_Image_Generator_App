import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../../../constants/colors';
import { fontFamily } from '../../../constants/layout';

interface HeaderProps {
  label: string;
  title: string;
  containerStyle?: ViewStyle;
}

const Header: FC<HeaderProps> = ({ label, title, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.headerLabel}>{label}</Text>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 4,
    gap: 2,
  },
  headerLabel: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fontFamily.black,
    letterSpacing: 4,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 36,
    fontFamily: fontFamily.black,
    letterSpacing: 2,
    lineHeight: 40,
  },
});
