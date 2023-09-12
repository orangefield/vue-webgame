<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState} from 'vuex';
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';

export default {
    props: {
        // cellData: String, // 'O', 'X'
        cellIndex: Number,
        rowIndex: Number,
    },
    computed: {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,
            cellData(state) { // this 써야하니까 일반함수 형태로
                return state.tableData[this.rowIndex][this.cellIndex];
            }
        })
        // cellData(){ // 부모에게서 물려받지 않고 바로 접근하기
        //     return this.$store.state.tableData[this.rowIndex][this.cellIndex] 
        // },
        // tableData(){ // Vuex의 state를 this.tableData처럼 사용하기 위해 반드시 computed에 연결해야 한다
        //     return this.$store.state.tableData;
        // },
        // turn(){
        //     return this.$store.state.turn;
        // },
    },
    methods: {
        onClickTd() {
            if(this.cellData) return; // 남이 누른 칸을 누르면 중단

            // mutation을 불러들일 때는 commit
            // 첫번째 인자 : 뮤테이션 이름, (두번째 인자 : 데이터)
            this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex}); 

            let win = false;
            if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn) {
                win = true;
            }
            if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn) {
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
}
</script>