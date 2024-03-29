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
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {IImageItem, IRootState} from '../types';
import {imageInfoSlice} from '../store';
import HeartSvg from '../assets/icon/heart-solid.svg';
import SendSvg from '../assets/icon/paper-plane-solid.svg';
import UpSvg from '../assets/icon/chevron-up-solid.svg';

interface IProps {
  data: IImageItem;
  isContentsShowing: boolean;
  isShowingBtn: boolean;
  navigation: any;
  flatListRef: RefObject<FlatList<any>>;
  commentItemHeight: number;
  headerHeight: number;
}

const CommentBar = ({
  data,
  navigation,
  isContentsShowing,
  isShowingBtn,
  flatListRef,
  commentItemHeight,
  headerHeight,
}: IProps) => {
  const {id, comments, isBookmarked, user} = data;

  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState('');

  const contentOffset =
    (commentItemHeight + 15) * comments?.length + headerHeight;

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const pageNumber = useSelector((state: IRootState) => {
    return state.pageNumber.value;
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
          style={styles.previewContentsContainer}
          activeOpacity={1}
          onPress={() =>
            flatListRef.current?.scrollToOffset({
              offset: contentOffset,
            })
          }>
          <Text style={styles.previewText}>{user.name}님의 작성 게시글</Text>
          <UpSvg width={15} height={20} fill={'#3D3C42'} />
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
        <HeartSvg
          style={styles.likeBtn}
          fill={isBookmarked ? '#FF7272' : '#C4C8D3'}
          onPress={() => onPressBookmarkBtn(id, !isBookmarked)}
          width={25}
          height={25}
        />
        <Text style={isBookmarked ? styles.likedText : styles.disLikedText}>
          {isBookmarked
            ? '좋아한 게시글이에요 !'
            : '게시글이 맘에 들면 좋아요를 눌러보세요!'}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="생각을 나눠보세요."
          onChangeText={text => setCommentValue(text)}
          clearTextOnFocus
          value={commentValue}
        />
        <SendSvg
          onPress={onPressSubmitCommentBtn}
          style={styles.sendIcon}
          width={20}
          height={20}
          fill={'#BCC4D8'}
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
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderTopColor: '#BCC4D8',
    borderTopWidth: 1,
  },

  likedText: {
    fontWeight: '700',
    color: '#585A5F',
  },

  disLikedText: {
    fontWeight: '700',
    color: '#B9BDC7',
  },

  likeBtn: {
    marginRight: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    padding: 12,
    borderColor: '#BCC4D8',
    borderRadius: 15,
    borderWidth: 1.5,
  },

  sendIcon: {
    position: 'absolute',
    right: 15,
  },

  previewContentsContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: '#BCC4D8',
    backgroundColor: 'white',
    zIndex: 100,
  },

  previewText: {
    color: '#3D3C42',
    fontWeight: '600',
  },

  moveCurrentCommentBtn: {
    position: 'absolute',
    bottom: 135,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  btnText: {
    color: '#FF7272',
    fontWeight: '900',
  },
});
