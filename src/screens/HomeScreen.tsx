import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-community/async-storage';
import ImageItem from '../components/ImageItem';
import {getImageList} from '../service/fetchData';
import {imageInfoSlice, pageNumberSlice} from '../store';
import {IImageItem, IRootState} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
  });

  const pageNumber = useSelector((state: IRootState) => {
    return state.pageNumber.value;
  });

  useEffect(() => {
    const fetchData = async () => {
      const localData = await AsyncStorage.getItem('imageList');
      if (localData) {
        AsyncStorage.getItem('imageList', (err, result) => {
          if (err) {
            console.log(err);
          }
          dispatch(imageInfoSlice.actions.update(JSON.parse(result)));
        });
        AsyncStorage.getItem('page', (err, result) => {
          if (err) {
            console.log(err);
          }
          dispatch(pageNumberSlice.actions.increase(JSON.parse(result)));
        });
      } else {
        const res = await getImageList(1);
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
        );
        AsyncStorage.setItem('page', JSON.stringify(2));
      }
    };
    fetchData();
  }, [dispatch]);

  const onPressBookmarkBtn = (id: string, bool: boolean) => {
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
      const newList = res.data.map((el: IImageItem) => ({
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
          <ImageItem item={item} onPressBookmarkBtn={onPressBookmarkBtn} />
        )}
        ListFooterComponent={
          <TouchableOpacity onPress={handleLoadMoreData}>
            <View style={styles.moreDataBtn}>
              <MaterialIcons name="expand-more" size={50} color="gray" />
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
    borderRadius: 10,
    margin: 5,
  },

  imageItem: {
    borderRadius: 10,
  },

  moreDataBtn: {
    alignItems: 'center',
    width: '100%',
  },
});
