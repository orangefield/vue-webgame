<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellData: String, // 'O', 'X'
        cellIndex: Number,
        rowIndex: Number,
    }, 
    methods: {
        onClickTd() {
            const rootData = this.$root.$data;
            console.log(rootData); // 최상위의 데이터
            console.log(this.$parent.$data); // TdComponent의 부모(TrComponent)의 데이터(내가 니 애비다)
            
            rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn; // 현재 턴을 선택한 칸에 넣는다
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; // O -> X -> O -> ...
        },
    },
}
</script>