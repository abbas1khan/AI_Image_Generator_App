import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigatorParamList } from '../navigation/RootNavigator';

export type RoutePropType<T extends keyof RootNavigatorParamList> = RouteProp<
  RootNavigatorParamList,
  T
>;

export const useAppRoute = <T extends keyof RootNavigatorParamList>() => {
  return useRoute<RoutePropType<T>>();
};
