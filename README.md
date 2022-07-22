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
- ✅ Interested나 Clap과 같은 인터렉션 버튼과 inputbar가 존재해야하며, 인터렉션 버튼을 눌렀을때 데이터에 반영해서 게시글 목록에서도 표기되어야합니다.
  단, 과제에서는 좋아요 버튼 하나만 만드는 것으로 합니다.
- ✅ Timestamp나 —new— 바 , 댓글에 대한 Group은 구현하지 않으셔도 됩니다.
- ✅ 최신 댓글로' 와 같은 스크롤 최하단으로 이동하는 버튼이 있어야하며, 터치하면 이동되어야합니다.
- ✅ 스크롤을 내렸을때 본문에 있는 텍스트만 간단하게 bar형태로 보여주시면됩니다.
- ✅ 우측의 위로 화살표를 터치하면 본문이 펼쳐지며, 최상단으로 이동해야합니다.

# 구현 기능 상세

### 게시글 목록

1. 이미지 데이터 렌더링, 데이터 저장 관리

- Redux toolkit store와 AsyncStorage 이용

  이미지는 unsplash의 오픈 API를 이용했습니다. 받은 데이터를 리덕스 스토어 저장을 하고, 저장된 스토어의 값을 렌더링 해주었습니다. 앱이 reload시에도 데이터를 유지 시키기 위해 AsyncStorage를 이용해서 스토어에 저장된 값과 동기화 시켜주었습니다.
  따라서 첫 렌더링 시 AsyncStorage의 값이 비었다면 받아온 데이터 값을 저장해주었고, AsyncStorage의 값이 있다면 AsyncStorage의 값을 가져와서 리덕스 스토어를 업데이트 시켜주었습니다.

2. Load more

3. 게시글 좋아요 표시

4. Detail 페이지 이동

### 게시글 상세

1. 댓글 달기
2. 댓글 좋아요
3. 게시글 목록에서 좋아요 한 인터렉션 버튼
4. 최하단 이동 버튼
5. 스크롤 내렸을 시 본문 텍스트 bar 형태로 보여주기 / 터치 시 최상단 이동

# 구현 시 발생한 이슈 / 해결 과정

1. 이미지 리스트 Load more 기능을 구현하는 과정에서 발생한 이슈

- masynryList 라이브러리에서도 flatList와 같이 onEndReachedThreshold, onEndReached 메서드 사용이 가능했기에 두 메서드를 이용하여 infinite Scroll을 구현하고 싶었으나, <br />
  masonsy 라이브러리 사용시 onEndReach 함수 호출 시 [해당 함수가 여러 번 호출되는 이슈](https://github.com/hyochan/react-native-masonry-list/issues/11)와 <br />
  onEndReach 함수가 onEndReachedThreshold의 정확하지 않은 위치에서 실행되는 이슈가 있었습니다. 따라서 [해당 라이브러리 issue에 등록](https://github.com/hyochan/react-native-masonry-list/issues/41) 후 부득이하게 버튼을 통해 Load more를 구현하였습니다.
