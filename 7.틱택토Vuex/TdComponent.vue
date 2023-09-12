<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from 'vuex';

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
}
</script>