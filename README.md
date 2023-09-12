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
4-1. .gitignore, npm i, webpack --watch
4-2. v-bind, npm i vue-style-loader -D, npm i css-loader -D, rules
4-3. npm i -D webpack-dev-server, npm run dev
4-4. setTimeout, clearTimeout, reduce
4-5. computed, v-show, v-if, template 태그

# 프로젝트 폴더에서 npm i : package.json에 적힌 것들이 자동으로 설치된다
# 파일을 저장하면 자동으로 빌드할 수 있도록 웹팩이 지켜보게 한다
# 로더를 추가하면 rules에도 추가
# 자동으로 빌드되면서 html 파일을 새로고침하지 않아도 핫리로딩 되게 수정
# webpack-dev-server@4 부터는 devServer 추가가 필요함
# devMiddleware (X), static (O) : http://localhost:8080/dist/app.js 까지는 가지만 html 파일 Not Found
# devMiddleware (O), static (X) : http://localhost:8080/ 까지만 감
```

5. 가위바위보
```
5-1. Vue.js devtools
5-2. v-bind:class, v-bind:style
5-3. Vue Lifecycle : created, mounted, updated, destroyed
5-4. JS

# webpack-dev-server : 웹팩의 아웃풋을 실제 파일로 저장하는게 아니라 메모리로 저장한다. 그러므로 웹팩데브서버를 쓰면 dist/app.js 파일이 안 만들어진다
# 뷰로 만든 화면에서 Vue.js devtools가 작동하지 않게 하려면 Vue.config.devtools = false;
# :class, :style : 객체 형식{ } 지원
# :style 내부는 카멜케이스로 작성
# created : 데이터가 다 준비되었으나 화면에는 나타나기 전
# mounted : 화면에 나타난 후
# updated : 화면의 데이터가 바뀌어 화면이 다시 그려질 때
# destroyed : 화면에 있다가 사라질 때
# 화면에 표시되고 난 후에야 화면에 접근할 수 있기 때문에 보통 mounted에서 많이 움직인다
# setTimeout, setInterval 등을 사용했다면 컴포넌트가 사라진 이후에도 계속 실행되기 때문에 beforeDestroy에서 clearTimeout, clearInterval을 해줘야  메모리 누수가 발생하지 않는다
```

6. 로또
```
6-1. 세팅
6-2. 자식 컴포넌트 등록, props
6-3. timeouts
6-4. watch

# 자식 컴포넌트를 등록하기 위해서는 import 하고, components에 등록한다
# babel : 새로운 문법을 옛 문법으로 바꿔준다
# setTimeout을 timeouts에 저장해주면 clearTimeout 때 쓸 수 있다
# computed : 새로운 값을 리턴한다
# watch : 어떤 값이 바뀌었는지 아닌지 감시. 특정 동작을 수행한다. 최대한 사용X
```

7. 틱택토
```
7-1. 2차원 배열
7-2. this.$root, this.$parent
7-3. Vue3는 vue.set(= this.$set)이 삭제됐다
7-4. 틱택토 완성

# 테이블의 칸 하나가 바뀌면 전체가 다시 계산되어야 한다
# 우리가 원하는 딱 그 칸만 렌더링 되도록 테이블을 컴포넌트로 나누고 나눠서 접근한다
# 자주 쓴다!
# this.$root : 최상위
# this.$parent : 해당 컴포넌트의 부모 컴포넌트
```

7. 틱택토Vuex
```
7-5. Vuex, npm i vuex, store.js : 데이터를 중앙에서 통제할 수 있다

import { createApp } from 'vue';  
import TicTacToe from './TicTacToe';
import store from './store';

createApp(TicTacToe)
    .use(store)
    .mount('#root');

7-6. $store.state, $store.commit
7-7. mapState
7-8. devtools 분석 및 수정
7-9. slot

# ...mapState(['winner', 'turn'])   // 기본형
# 
...mapState({
    winner: state => state.winner,
    turnState: 'turn',  // 이름을 바꿀 수도 있다
})
# 
data() {
    return {
        num: 1,
    }
},
computed: {
    ...mapState({
        winner(state){
            return state.winner + this.num;  // 스토어의 데이터에 컴포넌트의 데이터를 쿵짝쿵짝 할 수 있다
        }
    })
}
# 화살표함수는 this를 못쓰지만 일반함수는 this를 쓸 수 있다 
# https://ko.vuejs.org/guide/components/slots.html
# 슬롯 : 화면에 표시될 테이블컴포넌트가 아닌 부모 컴포넌트의 데이터, 메서드, 컴포넌트에 접근해서 쓸 수 있다(IoC, DI의 개념)
# v-for의 :key 렌더링할 때 다른지 아닌지(화면을 다시 그려야할지 아닐지) 판단하는 기준이 된다
# 반복문에서 배열이 추가되는 경우, 중간에 수정되는 경우 : 인덱스가 변경되지 않거나 마지막 위치에 추가되기만 하기 때문에 변경되는 부분만 다시 그리면 된다
# 배열 중간에서 삭제되는 경우 : 삭제 되는 위치부터 끝까지 다 다시 그려야 한다. (인덱스가 변경되기 때문)
```