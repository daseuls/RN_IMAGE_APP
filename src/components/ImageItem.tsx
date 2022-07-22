import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IImageItem} from '../types/index';
import {IDetailScreenProp} from '../types/navigator';

interface IProps {
  item: IImageItem;
  onPressBookmarkBtn: (id: string, isBookmarked: boolean) => void;
}

const ImageItem = ({item, onPressBookmarkBtn}: IProps) => {
  const navigation = useNavigation<IDetailScreenProp>();
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
      <Ionicons
        name="heart"
        color={isBookmarked ? '#FF7272' : '#C4C8D3'}
        style={styles.likeIcon}
        size={20}
        onPress={() => onPressBookmarkBtn(id, !isBookmarked)}
      />
    </>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    margin: 5,
    borderRadius: 10,
  },

  imageItem: {
    borderRadius: 10,
  },

  likeIcon: {
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
});
