import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import CommentItem from '../components/CommentItem';
import {windowWidth} from '../utils/dimensions';
import {IRootState} from '../types/index';
import {RootStackParamList} from '../types/navigator';
import {imageInfoSlice} from '../store';
import CommentBar from '../components/CommentBar';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

type IProps = StackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({navigation, route}: IProps) => {
  const {user, alt_description, description, urls, id, comments} =
    route.params.data;

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isContentsShowing, setIsContentsShowing] = useState(true);
  const [isShowingBtn, setIsShowingBtn] = useState(false);

  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList>(null);

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const pageNumber = useSelector((state: IRootState) => {
    return state.pageNumber.value;
  });

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
    AsyncStorage.setItem('page', JSON.stringify(pageNumber));
  };

  const handleScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    if (comments) {
      contentOffset.y > 10 ? setIsShowingBtn(true) : setIsShowingBtn(false);
    }

    contentSize.height - layoutMeasurement.height - headerHeight <
    contentOffset.y
      ? setIsContentsShowing(true)
      : setIsContentsShowing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        onScroll={handleScrollEvent}
        scrollEventThrottle={100}
        ListFooterComponent={
          comments ? null : (
            <View style={styles.previewContentsContainer}>
              <EvilIcons name="comment" size={40} color="#B9BDC7" />
              <Text style={styles.previewContentsText}>생각을 나눠보세요</Text>
            </View>
          )
        }
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
            <View style={styles.descriptionContainer}>
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
              {alt_description && (
                <Text style={styles.description}>{alt_description}</Text>
              )}
            </View>
            <FastImage style={styles.photoImage} source={{uri: urls.small}} />
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
      <CommentBar
        data={route.params.data}
        navigation={navigation}
        isContentsShowing={isContentsShowing}
        isShowingBtn={isShowingBtn}
        flatListRef={flatListRef}
      />
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

  descriptionContainer: {
    padding: 10,
  },

  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3C42',
  },

  photoImage: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.95,
    borderRadius: 15,
  },

  contentsContainer: {
    justifyContent: 'flex-end',
    marginBottom: 10,
  },

  previewContentsContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewContentsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B9BDC7',
    marginTop: 5,
  },

  flatListContainer: {
    flexDirection: 'column-reverse',
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});
