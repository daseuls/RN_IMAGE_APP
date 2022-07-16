import {IImageItem} from '../types/index';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  item: IImageItem;
}

const ImageItem = ({item}: IProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {data: item});
      }}
      key={item.id}
      style={styles.imageContainer}>
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
