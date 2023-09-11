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
            console.log(this.$root.$data); // 최상위의 데이터
            console.log(this.$parent.$data); // TdComponent의 부모(TrComponent)의 데이터(내가 니 애비다)
            this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O'; // Td에서 최상위인 TicTacToe의 데이터를 바꿀 수 있다
        },
    },
}
</script>