import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types/navigator';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({route}: IProps) => {
  console.log(route.params.data.id);
  const {user} = route.params.data;
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.userImage}
        source={{uri: user.profile_image.small}}
      />
      <Text>{user.name}</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
