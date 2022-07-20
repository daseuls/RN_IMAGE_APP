import {IImageItem} from '../types/index';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  item: IImageItem;
  onPressBookmarkBtn: any;
}

const ImageItem = ({item, onPressBookmarkBtn}: IProps) => {
  const navigation = useNavigation();
  const {id, urls, height, isBookmarked} = item;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail', {data: item});
        }}
        key={id}
        style={styles.imageContainer}>
        <FastImage
          source={{uri: urls.small}}
          style={{...styles.imageItem, height: height * 0.07}}
        />
      </TouchableOpacity>
      {isBookmarked ? (
        <Ionicons
          onPress={() => onPressBookmarkBtn(id, !isBookmarked)}
          name="heart"
          style={styles.likeIcon}
        />
      ) : (
        <Ionicons
          onPress={() => onPressBookmarkBtn(id, !isBookmarked)}
          name="heart"
          style={{...styles.likeIcon, color: 'gray'}}
        />
      )}
    </>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    borderRadius: 10,
    margin: 5,
  },

  imageItem: {
    borderRadius: 10,
  },

  likeIcon: {
    color: 'red',
    fontSize: 20,
    marginLeft: 8,
  },
});
