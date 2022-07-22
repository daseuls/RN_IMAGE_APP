import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-community/async-storage';
import ImageItem from '../components/ImageItem';
import {getImageList} from '../service/fetchData';
import {imageInfoSlice, pageNumberSlice} from '../store';
import {IImageItem, IRootState} from '../types';
import MoreSvg from '../assets/icon/angle-down-solid.svg';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const pageNumber = useSelector((state: IRootState) => {
    return state.pageNumber.value;
  });

  useEffect(() => {
    const fetchImageListData = async () => {
      const localData = await AsyncStorage.getItem('imageList');
      if (localData) {
        AsyncStorage.getItem('imageList', (err, result) => {
          if (result) {
            dispatch(imageInfoSlice.actions.update(JSON.parse(result)));
          }
          if (err) {
            console.log(err);
          }
        });
        AsyncStorage.getItem('page', (err, result) => {
          if (result) {
            dispatch(pageNumberSlice.actions.increase(JSON.parse(result)));
          }
          if (err) {
            console.log(err);
          }
        });
      } else {
        const res = await getImageList(1);
        AsyncStorage.setItem(
          'imageList',
          JSON.stringify(
            res?.data.map((el: IImageItem) => ({...el, isBookmarked: false})),
          ),
        );
        dispatch(
          imageInfoSlice.actions.update(
            res?.data.map((el: IImageItem) => ({...el, isBookmarked: false})),
          ),
        );
        AsyncStorage.setItem('page', JSON.stringify(2));
      }
    };
    fetchImageListData();
  }, [dispatch]);

  const handleImageListBookmark = (id: string, bool: boolean) => {
    const updatedList = imageList.map(el =>
      el.id === id ? {...el, isBookmarked: bool} : el,
    );
    dispatch(imageInfoSlice.actions.update(updatedList));
    AsyncStorage.setItem('imageList', JSON.stringify(updatedList));
    AsyncStorage.setItem('page', JSON.stringify(pageNumber));
  };

  const handleLoadMoreData = () => {
    const fetchData = async () => {
      const res = await getImageList(pageNumber);
      console.log(res);
      const newList = res?.data.map((el: IImageItem) => ({
        ...el,
        isBookmarked: false,
      }));
      dispatch(imageInfoSlice.actions.update([...imageList, ...newList]));
      dispatch(pageNumberSlice.actions.increase(pageNumber + 1));
    };
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <MasonryList
        keyExtractor={(item, index): string => `${item.id}${index}`}
        numColumns={2}
        data={imageList}
        renderItem={({item}) => (
          <ImageItem
            item={item}
            handleImageListBookmark={handleImageListBookmark}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity onPress={handleLoadMoreData}>
            <View style={styles.moreDataBtn}>
              <MoreSvg width={30} height={50} fill={'gray'} />
            </View>
          </TouchableOpacity>
        }
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
    margin: 5,
    borderRadius: 10,
  },

  imageItem: {
    borderRadius: 10,
  },

  moreDataBtn: {
    alignItems: 'center',
    width: '100%',
  },
});
