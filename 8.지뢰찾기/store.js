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
        openedCount: 0,
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
            state.openedCount = 0; // 얘가 row*cell-mine과 같아지면 승리
            state.result = '';
        },
        [OPEN_CELL](state, { row, cell }) {
            let openedCount = 0; // 연 칸 갯수
            const checked = []; // 주변을 검사하면서 한 번 검사한 칸을 넣는 곳

            function checkAround(row, cell) { // 주변 8칸 검사
                // Undefined 검사
                const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if (checkRowOrCellIsUndefined) {
                    return;
                }

                // 열렸거나, 지뢰, 깃발, 물음표는 검사하지 않기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    return;
                }

                // 한 번 연 칸은 검사하지 않기
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                let around = [];
                if (state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1],
                        state.tableData[row - 1][cell],
                        state.tableData[row - 1][cell + 1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell + 1],
                    state.tableData[row][cell - 1]
                ]);
                if (state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell + 1],
                        state.tableData[row + 1][cell],
                        state.tableData[row + 1][cell - 1]
                    ]);
                }

                const counted = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                if (counted.length === 0 && row > -1) { // 주변 칸에 지뢰가 하나도 없으면 
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                state.tableData[row][cell] = counted.length;
            }
            checkAround(row, cell); // 제일 처음 재귀를 시작하는 부분(checkAround를 최초로 호출하는 부분)
            let halted = false;
            let result;

            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {// state에 쌓인 것 + 방금 마지막으로 연 칸
                halted = true;
                result = `${state.timer} 초만에 승리하셨습니다.`;
            }
            // 최종 데이터 vuex store에 저장
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;

        },
        [CLICK_MINE](state, { row, cell }) {
            state.halted = true;
            state.tableData[row][cell] = CODE.CLICKED_MINE;
        },
        [FLAG_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.MINE) {
                state.tableData[row][cell] = CODE.FLAG_MINE;
            } else {
                state.tableData[row][cell] = CODE.FLAG;
            }
        },
        [QUESTION_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                state.tableData[row][cell] = CODE.QUESTION_MINE;
            } else {
                state.tableData[row][cell] = CODE.QUESTION;
            }
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                state.tableData[row][cell] = CODE.MINE;
            } else {
                state.tableData[row][cell] = CODE.NORMAL;
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
    actions: {

    },
});