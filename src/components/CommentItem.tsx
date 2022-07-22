import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICommentItem} from '../types';
import HeartSvg from '../assets/icon/heart-solid.svg';

interface IProps {
  data: ICommentItem;
  handleCommentLike: (id: number, isLiked: boolean) => void;
}

const CommentItem = ({data, handleCommentLike}: IProps) => {
  const {isLiked, text, id} = data;

  return (
    <View style={styles.container}>
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
