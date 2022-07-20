# Classom Assignment

# 사용 기술 / 라이브러리

- JavaScript, TypeScript, React Native
- Redux-toolkit (상태 관리)
- react icon (아이콘)
- react (이미지 리스트 레이아웃)
- react-fastImage (빠른 이미지 로딩)
- react navigation (스크린 이동)

# 실행 방법

# 요구 사항

# 구현 기능 상세

1. 이미지 데이터 렌더링, 데이터 저장 관리

- Redux toolkit store와 AsyncStorage 이용

  이미지는 unsplash의 오픈 API를 이용했습니다. 받은 데이터를 리덕스 스토어 저장을 하고, 저장된 스토어의 값을 렌더링 해주었습니다. 앱이 reload시에도 데이터를 유지 시키기 위해 AsyncStorage를 이용해서 스토어에 저장된 값과 동기화 시켜주었습니다.
  따라서 첫 렌더링 시 AsyncStorage의 값이 비었다면 받아온 데이터 값을 저장해주었고, AsyncStorage의 값이 있다면 AsyncStorage의 값을 가져와서 리덕스 스토어를 업데이트 시켜주었습니다.

# 구현 시 발생한 이슈 / 해결 과정

1. 이미지 리스트 Load more 기능을 구현하는 과정에서 발생한 이슈

masynryList 라이브러리에서도 flatList와 같이 onEndReachedThreshold, onEndReached 메서드 사용이 가능했기에 두 메서드를 이용하여 infinite Scroll을 구현하고 싶었으나,

- masonsy 라이브러리 사용시 onEndReach 함수 호출 시 해당 함수가 여러 번 호출되는 이슈와
  https://github.com/hyochan/react-native-masonry-list/issues/11

  - onEndReach 함수가 onEndReachedThreshold의 정확하지 않은 위치에서 실행되는 이슈가 있었습니다.

  따라서 issue에 등록 후 부득이하게 버튼을 통해 Load more를 구현하였습니다.

https://github.com/hyochan/react-native-masonry-list/issues/41
