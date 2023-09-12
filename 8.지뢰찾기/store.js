import { createStore } from 'vuex';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE'; // 지뢰 밟음
export const FLAG_CELL = 'FLAG_CELL'; // 깃발 표시
export const QUESTION_CELL = 'QUESTION_CELL'; // 물음표 표시
export const NORMALIZE_CELL = 'NORMALIZE_CELL'; // 깃발, 물음표를 원상복구
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = { // 칸의 상태
    MINE: -7,
    NORMAL: -1, // 빈칸
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);

    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // 빈칸으로 게임 시작
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 랜덤으로 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};


export default createStore({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, // 중단된
        result: '',
    },
    getters: {

    },
    mutations: {
        [START_GAME](state, { row, cell, mine }) {
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
        },
        [OPEN_CELL](state) { },
        [CLICK_MINE](state) { },
        [FLAG_CELL](state) { },
        [QUESTION_CELL](state) { },
        [NORMALIZE_CELL](state) { },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
    actions: {

    },
});