import {IImageItem} from '.';

export type RootStackParamList = {
  Home: undefined;
  Detail: {data: IImageItem};
};

export type IDetailScreenProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;
