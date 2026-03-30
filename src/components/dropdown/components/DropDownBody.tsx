import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IAIModel } from '../../../constants/aimodels';
import { colors } from '../../../constants/colors';
import { fontFamily } from '../../../constants/layout';

interface DropDownBodyProps {
  allData: IAIModel[];
  onPress: (item: IAIModel) => void;
}

const DropDownBody = ({ allData, onPress }: DropDownBodyProps) => {
  return (
    <View style={styles.container}>
      {allData.map((item, index) => (
        <Pressable
          key={item.model}
          onPress={() => onPress(item)}
          style={[
            styles.itemContainer,
            index > 0 && styles.itemTopBorder,
            index === allData.length - 1 && styles.itemBottomBorder,
          ]}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.model}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DropDownBody;

const styles = StyleSheet.create({
  container: {
    top: 60,
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.borderElevated,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
  },
  itemContainer: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
  },
  itemTopBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  itemBottomBorder: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
