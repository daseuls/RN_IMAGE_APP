import React, {RefObject, useState} from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {IImageItem, IRootState} from '../types';
import {imageInfoSlice} from '../store';

interface IProps {
  data: IImageItem;
  isContentsShowing: boolean;
  isShowingBtn: boolean;
  navigation: any;
  flatListRef: RefObject<FlatList<any>>;
}

const CommentBar = ({
  data,
  navigation,
  isContentsShowing,
  isShowingBtn,
  flatListRef,
}: IProps) => {
  const {id, comments, isBookmarked, user} = data;

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const pageNumber = useSelector((state: IRootState) => {
    return state.pageNumber.value;
  });

  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState('');

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
            ...data,
            comments: [...comments, commentData],
          },
        });
        dispatch(imageInfoSlice.actions.update(updatedList));
        AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
        flatListRef.current?.scrollToEnd();
      } else {
        const updatedList = imageList.map((imageInfo: IImageItem) =>
          imageInfo.id === id
            ? {...imageInfo, comments: [commentData]}
            : imageInfo,
        );
        navigation.setParams({
          data: {
            ...data,
            comments: [commentData],
          },
        });
        dispatch(imageInfoSlice.actions.update(updatedList));
        AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
      }
    }
    AsyncStorage.setItem('page', JSON.stringify(pageNumber));
  };

  const onPressBookmarkBtn = (imageId: string, bool: boolean) => {
    const updatedList = imageList.map(el =>
      el.id === imageId ? {...el, isBookmarked: bool} : el,
    );
    navigation.setParams({
      data: {
        ...data,
        isBookmarked: bool,
      },
    });
    dispatch(imageInfoSlice.actions.update(updatedList));
    AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
  };

  return (
    <>
      {!isContentsShowing && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.previewContentsContainer}
          onPress={() => flatListRef.current?.scrollToOffset({offset: 5000})}>
          <Text style={styles.previewText}>{user.name}님의 작성 게시글</Text>
          <Ionicons name="chevron-up" size={20} color="#3D3C42" />
        </TouchableOpacity>
      )}
      {isShowingBtn && (
        <TouchableNativeFeedback
          onPress={() => flatListRef.current?.scrollToEnd()}>
          <View style={styles.moveCurrentCommentBtn}>
            <Text style={styles.btnText}>최신 댓글로</Text>
          </View>
        </TouchableNativeFeedback>
      )}
      <View style={styles.likedIconContainer}>
        <Ionicons
          onPress={() => onPressBookmarkBtn(id, !isBookmarked)}
          name="heart-sharp"
          size={30}
          color={isBookmarked ? '#FF7272' : '#C4C8D3'}
          style={styles.likeBtn}
        />
        <Text
          style={{
            ...styles.likedText,
            color: isBookmarked ? '#585A5F' : '#B9BDC7',
          }}>
          {isBookmarked
            ? '좋아한 게시글이에요 !'
            : '게시글이 맘에 들면 좋아요를 눌러보세요!'}
        </Text>
      </View>
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
    </>
  );
};

export default CommentBar;

const styles = StyleSheet.create({
  likedIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopColor: '#BCC4D8',
    borderTopWidth: 1,
    marginHorizontal: 10,
    width: '100%',
  },

  likedText: {
    fontWeight: '700',
  },

  likeBtn: {
    marginRight: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },

  input: {
    borderColor: '#BCC4D8',
    borderRadius: 15,
    borderWidth: 1.5,
    padding: 12,
    width: '100%',
  },

  sendIcon: {
    color: '#BCC4D8',
    fontSize: 20,
    position: 'absolute',
    right: 10,
  },

  previewContentsContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#BCC4D8',
    paddingHorizontal: 30,
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  previewText: {
    fontWeight: '600',
    color: '#3D3C42',
  },

  moveCurrentCommentBtn: {
    position: 'absolute',
    bottom: 135,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  btnText: {
    fontWeight: '900',
    color: '#FF7272',
  },
});
