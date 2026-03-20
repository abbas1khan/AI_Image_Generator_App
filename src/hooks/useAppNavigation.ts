import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigatorParamList } from '../navigation/RootNavigator';

export type NavigationProp = NativeStackNavigationProp<RootNavigatorParamList>;

export const useAppNavigation = () => {
  return useNavigation<NavigationProp>();
};
