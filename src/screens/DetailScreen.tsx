import React from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {RootStackParamList} from '../types/navigator';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {windowWidth} from '../utils/dimensions';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({route}: IProps) => {
  const {user, alt_description, description, urls} = route.params.data;

  console.log(route.params.data);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoContainer}>
          <FastImage
            style={styles.userImage}
            source={{uri: user.profile_image.small}}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}> · Instructor</Text>
        </View>
        <View>
          <Text>{alt_description}</Text>
          <Text>{description}</Text>
          <View style={styles.imageContainer}>
            <FastImage style={styles.photoImage} source={{uri: urls.small}} />
          </View>
        </View>
        <View style={styles.commentsContainer} />
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="생각을 나눠보세요."
        keyboardType="numeric"
      />
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

  photoImage: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    borderRadius: 15,
  },

  contentsContainer: {},

  imageContainer: {
    alignItems: 'center',
  },

  commentsContainer: {},

  input: {
    borderColor: '#BCC4D8',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
});
