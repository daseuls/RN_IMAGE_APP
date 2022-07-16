import {IImageItem} from '../types/index';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IProps {
  item: IImageItem;
}

const ImageItem = ({item}: IProps) => {
  // const [isLiked, setIsLiked] = useState(false);
  return (
    <TouchableOpacity key={item.id} style={styles.imageContainer}>
      <FastImage
        source={{uri: item.urls.small}}
        style={{...styles.imageItem, height: item.height * 0.07}}
      />
    </TouchableOpacity>
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
});
