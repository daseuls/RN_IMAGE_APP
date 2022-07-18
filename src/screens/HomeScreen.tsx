import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {getImageList} from '../service/fetchData';
import MasonryList from '@react-native-seoul/masonry-list';
import ImageItem from '../components/ImageItem';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {imageInfoSlice} from '../store';
import {IRootState} from '../types';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getImageList(1);
      const localData = await AsyncStorage.getItem('imageList');
      if (localData) {
        AsyncStorage.getItem('imageList', (err, result) => {
          if (err) {
            console.log(err);
          }
          dispatch(imageInfoSlice.actions.update(JSON.parse(result))); // 로컬에 들은거 스토어 저장
        });
      } else {
        AsyncStorage.setItem('imageList', JSON.stringify(res.data));
        dispatch(imageInfoSlice.actions.update(res.data)); // 데이터 받은거 스토어에 저장
      }
    };
    fetchData();
  }, [dispatch]);

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
    margin: 5,
  },

  imageContainer: {
    borderRadius: 10,
    margin: 5,
  },

  imageItem: {
    borderRadius: 10,
  },
});
