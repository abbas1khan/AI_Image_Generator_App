import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import {
  IStylePreset,
  STYLE_PRESETS,
} from '../../../../../constants/stylePresets';
import { colors } from '../../../../../constants/colors';
import { fontFamily } from '../../../../../constants/layout';

interface StyleListProps {
  selectedStyle: IStylePreset;
  onPress: (style: IStylePreset) => void;
}

const StyleList: FC<StyleListProps> = ({ selectedStyle, onPress }) => {
  const StyleChip = ({
    item,
    index,
  }: {
    item: IStylePreset;
    index: number;
  }) => {
    return (
      <Pressable
        key={item.label}
        disabled={selectedStyle.label === item.label}
        onPress={() => onPress(item)}
        style={[
          styles.styleChip,
          selectedStyle.label === item.label && styles.styleChipActive,
        ]}
      >
        <Text
          style={[
            styles.styleChipText,
            selectedStyle.label === item.label && styles.styleChipTextActive,
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.listContainer}>
      {STYLE_PRESETS.map((item, index) => (
        <StyleChip key={item.label} item={item} index={index} />
      ))}
    </View>
  );
};

export default StyleList;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: colors.border,
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  styleChipActive: {
    // backgroundColor: colors.primaryChipBg,
    borderColor: colors.primary,
  },
  styleChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: fontFamily.medium,
  },
  styleChipTextActive: {
    color: colors.primary,
  },
});
