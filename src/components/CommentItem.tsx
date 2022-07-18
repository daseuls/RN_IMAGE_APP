import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  data: String;
}

const CommentItem = ({data}: IProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="heart" style={styles.likeIcon} />
      <View style={styles.commentContainer}>
        <Text style={styles.comment}>{data}</Text>
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
