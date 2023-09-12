<template>
    <div>
        <div>{{ turn }} 님의 턴입니다.</div>
        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{
                    cellData }}</td>
            </tr>
        </table>
        <br />
        <div v-if="winner">{{ winner }} 님의 승리!</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// default랑 나머지들 한꺼번에 불러올 수도 있다
import store, { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';
import TableComponent from './TableComponent';

export default {
    store,
    components: {
        TableComponent,
    },
    computed: {
        ...mapState(['winner', 'turn', 'tableData']),
        // winner() {
        //     return this.$store.state.winner;
        // },
        // turn() {
        //     return this.$store.state.turn;
        // },
    },
    methods: {
        onClickTd(rowIndex, cellIndex) {
            if (this.cellData) return; // 남이 누른 칸을 누르면 중단

            // mutation을 불러들일 때는 commit
            // 첫번째 인자 : 뮤테이션 이름, (두번째 인자 : 데이터)
            this.$store.commit(CLICK_CELL, { row: rowIndex, cell: cellIndex });

            let win = false;
            if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
                win = true;
            }
            if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
                win = true;
            }
            if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
                win = true;
            }
            if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
                win = true;
            }

            if (win) {
                this.$store.commit(SET_WINNER, this.turn);

                // 초기화
                this.$store.commit(RESET_GAME);
            } else {
                let all = true; // all(9칸이 다 차면)이 true면 무승부
                this.tableData.forEach((row) => { // 무승부 검사
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });

                if (all) { // 무승부 확정
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else {
                    this.$store.commit(CHANGE_TURN);
                }
            }
        },
    },
}; 
</script>

<style>
table {
    border-collapse: collapse;
}

td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
}
</style>