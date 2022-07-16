import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {getImageList} from '../service/fetchData';
import MasonryList from '@react-native-seoul/masonry-list';
import ImageItem from '../components/ImageItem';

const HomeScreen = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getImageList(1);
      setImageList(res.data);
    };
    fetchData();
  }, []);

  console.log(imageList);

  return (
    <SafeAreaView style={styles.container}>
      <MasonryList
        keyExtractor={(item): string => item.id}
        numColumns={2}
        data={imageList}
        renderItem={({item}) => <ImageItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    borderRadius: 10,
    margin: 5,
  },

  imageItem: {
    borderRadius: 10,
  },
});
