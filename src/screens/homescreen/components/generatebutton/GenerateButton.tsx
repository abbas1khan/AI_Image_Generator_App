import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../../constants/colors';
import { FontFamily } from '../../../../constants/layout';

type GenerateButtonProps = {
  isGenerating: boolean;
  onPress: () => void;
};

const GenerateButton = ({ isGenerating, onPress }: GenerateButtonProps) => {
  return (
    <Pressable
      disabled={isGenerating}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.text}>Generate</Text>
    </Pressable>
  );
};

export default GenerateButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: FontFamily.SemiBold,
    letterSpacing: 0.3,
  },
});
