import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  FlatList,
} from 'react-native';

interface IProps {
  data: String;
}

const CommentItem = ({data}: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.comment}>{data}</Text>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: 'flex-end',
  },

  comment: {
    color: 'white',
  },
});
