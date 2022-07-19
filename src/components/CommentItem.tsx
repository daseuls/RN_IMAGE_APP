import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {ICommentItem} from '../types';

interface IProps {
  data: ICommentItem;
  onPressLikeBtn: any;
}

const CommentItem = ({data, onPressLikeBtn}: IProps) => {
  const {isLiked, text, id} = data;

  return (
    <View style={styles.container}>
      {isLiked ? (
        <Ionicons
          onPress={() => onPressLikeBtn(id, !isLiked)}
          name="heart"
          style={styles.likeIcon}
        />
      ) : (
        <Ionicons
          onPress={() => onPressLikeBtn(id, !isLiked)}
          name="heart"
          style={{...styles.likeIcon, color: 'gray'}}
        />
      )}

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
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  comment: {
    color: 'white',
  },

  likeIcon: {
    color: 'red',
    fontSize: 20,
    marginRight: 2,
  },
});
