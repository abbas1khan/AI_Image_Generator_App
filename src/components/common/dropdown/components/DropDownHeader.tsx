import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { IAIModel } from '../../../../constants/aimodels';
import { colors } from '../../../../constants/colors';
import { fontFamily } from '../../../../constants/layout';
import Check from '../../../../../assets/svgs/check';
import ChevronDown from '../../../../../assets/svgs/chevronDown';

interface DropDownHeaderProps {
  selectedData: IAIModel;
  isOpen: boolean;
  onPress: () => void;
}

const DropDownHeader: FC<DropDownHeaderProps> = ({
  selectedData,
  isOpen,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isOpen && styles.selectedContainer]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{selectedData.name}</Text>
        <Text style={styles.subtitle}>{selectedData.model}</Text>
      </View>

      {isOpen ? (
        <Check color={colors.primary} size={11} />
      ) : (
        <ChevronDown color={colors.textSecondary} size={11} />
      )}
    </Pressable>
  );
};

export default DropDownHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingLeft: 18,
    paddingRight: 16,
    backgroundColor: colors.borderSubtle,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderElevated,
  },
  selectedContainer: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
