import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
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
import {TouchableOpacity} from 'react-native-gesture-handler';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({navigation, route}: IProps) => {
  const {user, alt_description, description, urls, id, comments, isBookmarked} =
    route.params.data;

  const [commentValue, setCommentValue] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isContentsShowing, setIsContentsShowing] = useState(true);
  const [isShowingBtn, setIsShowingBtn] = useState(false);

  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList<any>>();

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

  const onPressCommentLikeBtn = (commentId: number, bool: boolean) => {
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

  const onPressBookmarkBtn = (imageId: string, bool: boolean) => {
    const updatedList = imageList.map(el =>
      el.id === imageId ? {...el, isBookmarked: bool} : el,
    );
    navigation.setParams({
      data: {
        ...route.params.data,
        isBookmarked: bool,
      },
    });
    dispatch(imageInfoSlice.actions.update(updatedList));
    AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
    flatListRef.current?.scrollToOffset({offset: 608});
  };

  const handleScrollEvent = e => {
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    if (contentOffset.y > 10) {
      setIsShowingBtn(true);
    } else {
      setIsShowingBtn(false);
    }

    if (
      contentSize.height - layoutMeasurement.height - headerHeight <
      contentOffset.y
    ) {
      setIsContentsShowing(true);
    } else {
      setIsContentsShowing(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        onScroll={handleScrollEvent}
        scrollEventThrottle={100}
        ListHeaderComponent={
          <View
            onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
            style={styles.contentsContainer}>
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
          </View>
        }
        data={comments}
        inverted
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item, i) => `${item}${i}`}
        renderItem={({item}) => (
          <CommentItem
            data={item}
            onPressCommentLikeBtn={onPressCommentLikeBtn}
          />
        )}
      />
      {!isContentsShowing && (
        <View style={styles.previewContentsContainer}>
          <TouchableNativeFeedback
            onPress={() => flatListRef.current?.scrollToOffset({offset: 5000})}>
            <Text>{description}</Text>
          </TouchableNativeFeedback>
          <Ionicons name="chevron-up" size={20} />
        </View>
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
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

  contentsContainer: {
    justifyContent: 'flex-end',
  },

  flatListContainer: {
    flexDirection: 'column-reverse',
    flexGrow: 1,
    paddingHorizontal: 10,
  },

  imageContainer: {
    alignItems: 'center',
  },

  commentsContainer: {},

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
