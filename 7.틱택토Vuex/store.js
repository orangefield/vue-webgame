import { createStore } from 'vuex';

// export default : import로 바로 가져올 수 있고, 이름을 마음대로 지어줄 수 있다 import store from './store'; 가장 중요한 하나
// export : 이름을 중괄호로 묶어서 가져올 수 있다. import { SET_WINNER } from './store'; (이름 같아야 함) 여러 개

// export 해서 다른 파일에서 쓸 수 있게 모듈화(오타를 잡아줌)
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

// state, getters, mutations, actions 중요
export default createStore({
    state: { // vue의 data와 비슷
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    },
    getters: { // vue의 computed와 비슷

    },
    mutations: { // state를 수정할 때 사용(동기적), 함수명은 대문자로 지은 다음에 변수(object dynamic property)로 빼줬다
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}){
            state.tableData[row][cell] = state.turn;
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''], 
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    },
    actions: { // 비동기를 사용할 때 또는 여러 뮤테이션을 연달아 실행할 때

    },
});