import React, {Dispatch} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICommentItem} from '../types';
import HeartSvg from '../assets/icon/heart-solid.svg';

interface IProps {
  data: ICommentItem;
  handleCommentLike: (id: number, isLiked: boolean) => void;
  setCommentItemHeight: Dispatch<React.SetStateAction<number>>;
}

const CommentItem = ({
  data,
  handleCommentLike,
  setCommentItemHeight,
}: IProps) => {
  const {isLiked, text, id} = data;

  return (
    <View
      style={styles.container}
      onLayout={e => setCommentItemHeight(e.nativeEvent.layout.height)}>
      <HeartSvg
        onPress={() => handleCommentLike(id, !isLiked)}
        fill={isLiked ? '#FF7272' : '#C4C8D3'}
        style={styles.likeIcon}
        width={15}
        height={13}
      />
      <View style={styles.commentContainer}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 10,
  },

  commentContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFD24C',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  likeIcon: {
    marginRight: 3,
  },
});
