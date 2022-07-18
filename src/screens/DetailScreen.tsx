import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  FlatList,
} from 'react-native';
import {RootStackParamList} from '../types/navigator';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {windowWidth} from '../utils/dimensions';
import CommentItem from '../components/CommentItem';
import {useDispatch, useSelector} from 'react-redux';
import {imageInfoSlice} from '../store';
import AsyncStorage from '@react-native-community/async-storage';
import {IImageItem, IRootState} from '../types/index';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({navigation, route}: IProps) => {
  const {user, alt_description, description, urls, id, comments} =
    route.params.data;
  const [commentValue, setCommentValue] = useState('');

  const dispatch = useDispatch();

  console.log(comments);

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const onPressSubmitCommentBtn = () => {
    if (commentValue) {
      setCommentValue('');
      if (comments) {
        const updatedList = imageList.map((imageInfo: IImageItem) =>
          imageInfo.id === id
            ? {...imageInfo, comments: [...imageInfo.comments, commentValue]}
            : imageInfo,
        );
        navigation.setParams({
          data: {...route.params.data, comments: [...comments, commentValue]},
        });
        dispatch(imageInfoSlice.actions.update(updatedList));
        AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
      } else {
        const updatedList = imageList.map((imageInfo: IImageItem) =>
          imageInfo.id === id
            ? {...imageInfo, comments: [commentValue]}
            : imageInfo,
        );
        navigation.setParams({
          data: {...route.params.data, comments: [commentValue]},
        });
        dispatch(imageInfoSlice.actions.update(updatedList));
        AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
      }
    }
  };

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
        <View style={styles.commentsContainer}>
          {comments && (
            <FlatList
              data={comments}
              keyExtractor={(item, i) => `${item}${i}`}
              renderItem={({item}) => <CommentItem data={item} />}
            />
          )}
        </View>
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="생각을 나눠보세요."
        keyboardType="numeric"
        onChangeText={text => setCommentValue(text)}
        clearTextOnFocus
        value={commentValue}
      />
      <Button onPress={onPressSubmitCommentBtn} title="버튼" />
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
