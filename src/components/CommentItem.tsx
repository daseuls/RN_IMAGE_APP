import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ICommentItem} from '../types';

interface IProps {
  data: ICommentItem;
  onPressCommentLikeBtn: any;
}

const CommentItem = ({data, onPressCommentLikeBtn}: IProps) => {
  const {isLiked, text, id} = data;

  console.log(data);

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => onPressCommentLikeBtn(id, !isLiked)}
        name="heart"
        size={18}
        color={isLiked ? '#FF7272' : '#C4C8D3'}
        style={styles.likeIcon}
      />
      <View style={styles.commentContainer}>
        <Text style={styles.comment}>{text}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 5,
  },

  commentContainer: {
    backgroundColor: '#FFD24C',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  comment: {
    // color: 'white',
  },

  likeIcon: {
    marginRight: 3,
  },
});
