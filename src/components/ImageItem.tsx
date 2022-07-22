import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {IImageItem} from '../types/index';
import {IDetailScreenProp} from '../types/navigator';
import HeartSvg from '../assets/icon/heart-solid.svg';

interface IProps {
  item: IImageItem;
  handleImageListBookmark: (id: string, isBookmarked: boolean) => void;
}

const ImageItem = ({item, handleImageListBookmark}: IProps) => {
  const {navigate} = useNavigation<IDetailScreenProp>();
  const {id, urls, height, isBookmarked} = item;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigate('Detail', {data: item});
        }}
        key={id}
        style={styles.imageContainer}>
        <FastImage
          source={{uri: urls.small}}
          style={{...styles.imageItem, height: height * 0.07}}
        />
      </TouchableOpacity>
      <HeartSvg
        style={styles.likeIcon}
        width={20}
        height={20}
        fill={isBookmarked ? '#FF7272' : '#C4C8D3'}
        onPress={() => handleImageListBookmark(id, !isBookmarked)}
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
