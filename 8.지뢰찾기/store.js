import { createStore } from 'vuex';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE'; // 지뢰 밟음
export const FLAG_CELL = 'FLAG_CELL'; // 깃발 표시
export const QUESTION_CELL = 'QUESTION_CELL'; // 물음표 표시
export const NORMALIZE_CELL = 'NORMALIZE_CELL'; // 깃발, 물음표를 원상복구
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export default createStore({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        result: '',
    },
    getters: {

    },
    mutations: {
        [START_GAME](state, { row, cell, mine }) { },
        [OPEN_CELL](state) { },
        [CLICK_MINE](state) { },
        [FLAG_CELL](state) { },
        [QUESTION_CELL](state) { },
        [NORMALIZE_CELL](state) { },
        [INCREMENT_TIMER](state) { },
    },
    actions: {

    },
});