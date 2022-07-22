# Classom Assignment

# 사용 기술 / 라이브러리

- JavaScript, TypeScript, React Native
- Redux-toolkit (상태 관리)
- react icon (아이콘)
- [react-native-masonry-list (이미지 리스트 레이아웃)](https://github.com/hyochan/react-native-masonry-list#readme)
- react-fastImage (빠른 이미지 로딩)
- react navigation (스크린 이동)

# 실행 방법

# 요구 사항

> ✅ 체크 표시 한 것들은 구현 완료된 기능입니다.

### 1. 게시글 목록

- ✅ 사진과 같이 ListItem의 height는 Dynamic입니다. (contents size)
- ✅ 본문 내용을 보여주시면됩니다. 최대한 이미지를 많이 사용해주세요.
- ✅ 해당 게시글에 대한 좋아요 표기도 되어야합니다.
- ✅ 기본적으로 load more 기능을 구현합니다
- ✅ 해당 아이템을 누르면 각각의 게시글 상세로 진입해야 합니다.
- ✅ 게시글 상세의 좋아요 버튼을 터치 했을 때, 리스트에 해당 내용이 반영되어야합니다.
- ✅ 게시글의 데이터는 많을수록 좋습니다. 최소 1000개 이상.

### 2. 게시글 상세

- ✅ 게시글 상세는 정보를 보여주는 View와 해당 콘텐츠에 대한 댓글형식의 ListItem들이 표시되어야 합니다.
- ✅ 작성자의 정보가 표기되어야합니다. 또한 Text와 게시글 목록에서 보이던 이미지가 노출되어야 합니다.
- ✅ 스크롤을 내리면 댓글이 한개씩 보여져야합니다.
- ✅ Interested나 Clap과 같은 인터렉션 버튼과 inputbar가 존재해야하며, 인터렉션 버튼을 눌렀을때 데이터에 반영해서 게시글 목록에서도 표기되어야합니다. 단, 과제에서는 좋아요 버튼 하나만 만드는 것으로 합니다.
- ✅ Timestamp나 —new— 바 , 댓글에 대한 Group은 구현하지 않으셔도 됩니다.
- ✅ 최신 댓글로' 와 같은 스크롤 최하단으로 이동하는 버튼이 있어야하며, 터치하면 이동되어야합니다.
- ✅ 스크롤을 내렸을때 본문에 있는 텍스트만 간단하게 bar형태로 보여주시면됩니다.
- ✅ 우측의 위로 화살표를 터치하면 본문이 펼쳐지며, 최상단으로 이동해야합니다.

# 구현 기능 상세

### 게시글 목록

<details>
<summary>1. 이미지 데이터 렌더링, 데이터 저장 관리</summary>

- Redux toolkit store와 AsyncStorage 이용

  이미지는 unsplash의 오픈 API를 이용했습니다. 받은 데이터를 리덕스 스토어 저장을 하고, 저장된 스토어의 값을 렌더링 해주었습니다. 앱이 reload시에도 데이터를 유지 시키기 위해 AsyncStorage를 이용해서 스토어에 저장된 값과 동기화 시켜주었습니다.
  따라서 첫 렌더링 시 AsyncStorage의 값이 비었다면 API로 받아온 데이터 값을 저장해주었고, AsyncStorage의 값이 있다면 AsyncStorage의 값을 가져와서 리덕스 스토어를 업데이트 시켜주었습니다.

- Redux store와 AsyncStorage에 저장한 state들

  imagelist info와 page number를 저장했습니다. image list에 좋아요, 댓글들, 댓글의 좋아요의 이벤트들이 실행될 때마다 값을 store에 저장하고 AsyncStorage에 동기화 시켜주었습니다. page number를 저장한 이유는, 추가적으로 더 불러온 image list에 좋아요를 하거나 댓글을 달았을 때 추가된 리스트들까지 store와 AsyncStorage에 저장되기 때문에 re-load시 추가적으로 더 불러온 리스트들까지 화면에 보여지게 됩니다. 그 다음 page의 데이터를 추가적으로 더 불러오기 위해서는 page의 값도 저장을 해야 했습니다.
  </details>

<details>
<summary>2. Load more</summary>

- page number를 통한 버튼 onPress 이벤트 시, imagelist 데이터 업데이트

위에서 저장한 page number를 통해, Home Screen에 있는 해당 image list의 최하단의 아이콘을 클릭 시, 해당 page의 값을 받아오고, 그 값을 기존의 imageList에 추가해주었습니다.

</details>
<details>
<summary>3. 게시글 좋아요 표시</summary>

- `isBookmarked:boolean` 의 데이터 형식을 만들어, 첫 렌더링 시 해당 key와 value를 기존 받아온 데이터에 추가해주었습니다. image list에 있는 좋아요 버튼을 클릭할 때마다 값을 업데이트 하여 redux store와 AsyncStorage에 함께 업데이트 해주었습니다.

</details>

<details>
<summary>4. Detail 페이지 이동</summary>

- react-navigation을 이용해 해당 image를 클릭 시 DetailScreen이라는 Stack.Screen으로 이동할 수 있게 했습니다. 필요한 데이터 값은 navigation의 props로 전달해준 뒤 DetailScreen에서 렌더링 해주었습니다.
</details>

### 게시글 상세

<details>
<summary> 1. 댓글 달기 / 댓글 좋아요</summary>

- DetailScreen에서 TextInput에 onChangeText 이벤트를 통해 해당 input의 값을 setState 해주고, submit 할 때와 좋아요 아이콘을 누를 때마다 리덕스 스토어와 AsyncStorage를 업데이트 시켜주었습니다.
</details>

<details>
<summary>2. 최하단 이동 버튼</summary>

- FlatList의 onScroll 이벤트에 contentOffset.y의 값을 통해 스크롤이 된 정도의 여부를 isShowinBtn이라는 state를 통해 업데이트 시켜주었습니다. 이 state를 통해 스크롤이 어느 정도 되었다면 이 버튼을 보여주었고 버튼 클릭 시 scrollToEnd() 메서드를 이용해 최하단으로 이동 시켰습니다.
</details>

<details>
<summary> 3. 스크롤 내렸을 시 본문 텍스트 bar 형태로 보여주기 / 터치 시 최상단 이동</summary>

- FlatList의 onScroll 이벤트에 `contentSize.height - layoutMeasurement.height - headerHeight < contentOffset.y`를 통해 본문의 게시글이 화면에서 안보이게 되는 스크롤의 위치를 계산한 뒤 isContentsShowing이라는 state를 각 스크롤 위치에 따라 업데이트 시켜준 뒤 본문 텍스트 bar를 보여주었습니다.
</details>

# 구현 시 발생한 이슈 / 해결 과정

1. 이미지 리스트 Load more 기능을 구현하는 과정에서 발생한 이슈

- masynryList 라이브러리에서도 flatList와 같이 `onEndReachedThreshold`, `onEndReached` 메서드 사용이 가능했기에 두 메서드를 이용하여 infinite Scroll을 구현하고 싶었으나, <br />
  masonsy 라이브러리 사용시 `onEndReached` 함수 호출 시 [해당 함수가 여러 번 호출되는 이슈](https://github.com/hyochan/react-native-masonry-list/issues/11)와 <br />
  `onEndReach` 함수가 `onEndReachedThreshold`의 정확하지 않은 위치에서 실행되는 이슈가 있었습니다. 따라서 [해당 라이브러리 issue에 등록](https://github.com/hyochan/react-native-masonry-list/issues/41) 후 부득이하게 버튼을 통해 Load more를 구현하였습니다.
