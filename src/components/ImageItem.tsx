import {IImageItem} from '../types/index';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IProps {
  item: IImageItem;
}

const ImageItem = ({item}: IProps) => {
  return (
    <View key={item.id} style={styles.imageContainer}>
      <FastImage
        source={{uri: item.urls.small}}
        style={{...styles.imageItem, height: item.height * 0.07}}
      />
    </View>
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
