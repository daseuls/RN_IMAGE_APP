import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-community/async-storage';
import ImageItem from '../components/ImageItem';
import {getImageList} from '../service/fetchData';
import {imageInfoSlice} from '../store';
import {IImageItem, IRootState} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);

  const imageList = useSelector((state: IRootState) => {
    return state.imageInfo.value;
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
  };

  const renderLoadMoreBtn = () => {
    return (
      <View>
        <Text>Load More</Text>
      </View>
    );
  };

  const handleLoadMoreData = () => {
    const fetchData = async () => {
      console.log('실행');
      const res = await getImageList(page);
      const newList = res.data.map((el: IImageItem) => ({
        ...el,
        isBookmarked: false,
      }));
      dispatch(imageInfoSlice.actions.update([...imageList, ...newList]));
      setPage(prev => prev + 1);
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
          <Button title="Load more" onPress={handleLoadMoreData} />
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
});
