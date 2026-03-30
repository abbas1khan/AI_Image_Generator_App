import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import {
  ASPECT_RATIOS,
  IAspectRatio,
} from '../../../../../../constants/aspectRatio';
import { colors } from '../../../../../../constants/colors';
import { fontFamily } from '../../../../../../constants/layout';

interface RadioListProps {
  selectedRatio: IAspectRatio;
  onPress: (ratio: IAspectRatio) => void;
}

const RatioList: FC<RadioListProps> = ({ selectedRatio, onPress }) => {
  return (
    <View style={styles.container}>
      {ASPECT_RATIOS.map((item) => {
        const isSelected = selectedRatio.text === item.text;
        return (
          <Pressable
            key={item.text}
            style={[styles.ratioContainer]}
            onPress={() => onPress(item)}
          >
            <View
              style={[
                styles.ratioBox,
                isSelected && styles.selectedRatioBox,
                { aspectRatio: item.value },
              ]}
            />
            <Text style={[styles.text, isSelected && styles.selectedText]}>
              {item.text}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RatioList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  ratioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 6,
    paddingBottom: 4,
    gap: 6,
  },
  ratioBox: {
    width: 30,
    borderWidth: 3,
    borderColor: colors.borderFocused,
    borderRadius: 4,
  },
  selectedRatioBox: {
    borderColor: colors.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
  },
  selectedText: {
    color: colors.primary,
  },
});
