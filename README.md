1. 구구단
```
1-0. <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
1-1. data
1-2. v-model
1-3. 새로고침X, v-on
1-4. ref
```

2. 끝말잇기
```
2-1. 복습
2-2. 컴포넌트화
2-3. 컴포넌트의 특성
2-4. props (웹팩 : 스크립트가 여러개 있을 때 하나로 합쳐준다)
```

3. 숫자야구
```
# 앞으로 커밋 중간중간 Vue2 문법이 나올 것임. 코드는 가장 최신의 버전을 참고

3-1. 웹팩 사용
3-1.1 node.js 다운로드
3-1.2 npm init
3-1.3 npm install vue
3-1.4 npm i webpack webpack-cli -D
3-2. 웹팩 빌드
3-3. 웹팩 로더
3-3.1 npm i vue-loader -D
3-3.2 npm i vue-template-compiler -D
3-4. v-for, Vue2 -> Vue3 전환

# webpack은 node.js가 있어야 쓸 수 있다. (노드 받으면 npm이 따라옴)
# npm : 남이 만들어둔 자바스크립트 코드를 가져다 쓸 수 있음
# package.json : 내가 쓰는 남의 소스코드들이 정리되는 곳
# webpack, webpack-cli : 배포할 때 쓰는 보조도구로 자바스크립트를 합쳐준다
# .vue는 자바스크립트 파일이 아니므로 웹팩 로더 vue-loader를 사용해야 한다
```