import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-community/async-storage';
import ImageItem from '../components/ImageItem';
import {getImageList} from '../service/fetchData';
import {imageInfoSlice} from '../store';
import {IImageItem, IRootState} from '../types';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  console.log(imageList);

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
        AsyncStorage.setItem(
          'imageList',
          JSON.stringify(
            res.data.map((el: IImageItem) => ({...el, isBookmarked: false})),
          ),
        );
        dispatch(
          imageInfoSlice.actions.update(
            res.data.map((el: IImageItem) => ({...el, isBookmarked: false})),
          ),
        ); // 데이터 받은거 스토어에 저장
      }
    };
    fetchData();
  }, [dispatch]);

  const onPressBookmarkBtn = (id, bool) => {
    const updatedList = imageList.map(el =>
      el.id === id ? {...el, isBookmarked: bool} : el,
    );
    dispatch(imageInfoSlice.actions.update(updatedList));
    AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
  };

  return (
    <SafeAreaView style={styles.container}>
      <MasonryList
        keyExtractor={(item): string => item.id}
        numColumns={2}
        data={imageList}
        renderItem={({item}) => (
          <ImageItem item={item} onPressBookmarkBtn={onPressBookmarkBtn} />
        )}
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
