<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" :style="cellDataStyle(rowIndex, cellIndex)"
                @click="onClickTd(rowIndex, cellIndex)" @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)">
                <!-- 우클릭해도 메뉴 뜨지 않게 prevent -->
                {{ cellDataText(rowIndex, cellIndex) }}
            </td>
        </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import { CODE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './store';

export default {
    computed: {
        ...mapState(['tableData', 'halted']),
        cellDataStyle(state) {
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]) { // 각 칸마다 코드를 검사해서
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return {
                            background: '#444',
                        };
                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return {
                            background: 'white',
                        };
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return {
                            background: 'red',
                        };
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            background: 'yellow',
                        }
                    default:
                        return {};
                }
            };
        },
        cellDataText() {
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.MINE:
                        return 'X';
                    case CODE.NORMAL:
                        return '';
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        return '!';
                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        return '?';
                    case CODE.CLICKED_MINE:
                        return '펑';
                    default:
                        return '';
                }
            };
        },
    },
    methods: {
        onClickTd(row, cell) {
            if (this.halted) { // 중단되었을 땐 클릭X
                return;
            }
            this.$store.commit(OPEN_CELL, { row, cell });
        },
        onRightClickTd(row, cell) {
            if (this.halted) {
                return;
            }
            // console.log(row, cell);
            // (우클릭) 빈칸 > 물음표 > 깃발 > 빈칸 순환관계
            switch (this.tableData[row][cell]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, { row, cell });
                    return;
                case CODE.FLAG_MINE:    // 지뢰는 깃발 꼽았다가 다시 지뢰로
                case CODE.FLAG:         // 빈칸은 깃발 꼽았다가 빈칸으로
                    this.$store.commit(QUESTION_CELL, { row, cell });
                    return;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    this.$store.commit(NORMALIZE_CELL, { row, cell });
                    return;
                default:
                    return;

            }
        }
    }
};
</script>