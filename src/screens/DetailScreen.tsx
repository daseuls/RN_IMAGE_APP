import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types/navigator';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {windowWidth} from '../utils/dimensions';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({route}: IProps) => {
  const {user} = route.params.data;

  console.log(route.params.data);
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <FastImage
          style={styles.userImage}
          source={{uri: user.profile_image.small}}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}> · Instructor</Text>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },

  userName: {
    fontSize: windowWidth * 0.04,
    fontWeight: '700',
  },

  userRole: {
    fontSize: windowWidth * 0.04,
    fontWeight: '700',
    color: '#7D88A8',
  },
});
