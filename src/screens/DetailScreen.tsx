import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import CommentItem from '../components/CommentItem';
import {windowWidth} from '../utils/dimensions';
import {IImageItem, IRootState} from '../types/index';
import {RootStackParamList} from '../types/navigator';
import {imageInfoSlice} from '../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({navigation, route}: IProps) => {
  const {user, alt_description, description, urls, id, comments} =
    route.params.data;
  const [commentValue, setCommentValue] = useState('');

  const dispatch = useDispatch();

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const onPressSubmitCommentBtn = () => {
    if (commentValue) {
      setCommentValue('');

      const commentData = {
        id: new Date().valueOf(),
        text: commentValue,
        isLiked: false,
      };

      if (comments) {
        const updatedList = imageList.map((imageInfo: IImageItem) =>
          imageInfo.id === id
            ? {
                ...imageInfo,
                comments: [...imageInfo.comments, commentData],
              }
            : imageInfo,
        );
        navigation.setParams({
          data: {
            ...route.params.data,
            comments: [...comments, commentData],
          },
        });
        dispatch(imageInfoSlice.actions.update(updatedList));
        AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
      } else {
        const updatedList = imageList.map((imageInfo: IImageItem) =>
          imageInfo.id === id
            ? {...imageInfo, comments: [commentData]}
            : imageInfo,
        );
        navigation.setParams({
          data: {
            ...route.params.data,
            comments: [commentData],
          },
        });
        dispatch(imageInfoSlice.actions.update(updatedList));
        AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
      }
    }
  };

  const onPressLikeBtn = (commentId: number, bool: boolean) => {
    const updatedCommentList = comments.map(comment =>
      comment.id === commentId ? {...comment, isLiked: bool} : comment,
    );

    const updatedImageList = imageList.map(imageInfo =>
      imageInfo.id === id
        ? {...imageInfo, comments: updatedCommentList}
        : imageInfo,
    );

    navigation.setParams({
      data: {
        ...route.params.data,
        comments: updatedCommentList,
      },
    });
    dispatch(imageInfoSlice.actions.update(updatedImageList));
    AsyncStorage.setItem('imageList', JSON.stringify(updatedImageList));
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
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
                <FastImage
                  style={styles.photoImage}
                  source={{uri: urls.small}}
                />
              </View>
            </View>
          </>
        }
        data={comments}
        keyExtractor={(item, i) => `${item}${i}`}
        renderItem={({item}) => (
          <CommentItem data={item} onPressLikeBtn={onPressLikeBtn} />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="생각을 나눠보세요."
          keyboardType="numeric"
          onChangeText={text => setCommentValue(text)}
          clearTextOnFocus
          value={commentValue}
        />
        <Ionicons
          onPress={onPressSubmitCommentBtn}
          name="send"
          style={styles.sendIcon}
        />
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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    borderColor: '#BCC4D8',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
    width: '100%',
  },

  sendIcon: {
    color: '#BCC4D8',
    fontSize: 20,
    position: 'absolute',
    right: 10,
  },
});
