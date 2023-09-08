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

4. 반응속도체크
```
4-1 .gitignore, npm i, webpack --watch
4-2 v-bind, npm i vue-style-loader -D, npm i css-loader -D, rules
4-3 npm i -D webpack-dev-server, npm run dev
4-4 setTimeout, clearTimeout, reduce
4-5 computed, v-show, v-if, template 태그

# 프로젝트 폴더에서 npm i : package.json에 적힌 것들이 자동으로 설치된다
# 파일을 저장하면 자동으로 빌드할 수 있도록 웹팩이 지켜보게 한다
# 로더를 추가하면 rules에도 추가
# 자동으로 빌드되면서 html 파일을 새로고침하지 않아도 핫리로딩 되게 수정
# webpack-dev-server@4 부터는 devServer 추가가 필요함
# devMiddleware (X), static (O) : http://localhost:8080/dist/app.js 까지는 가지만 html 파일 Not Found
# devMiddleware (O), static (X) : http://localhost:8080/ 까지만 감
```