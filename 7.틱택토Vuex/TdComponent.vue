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
            if(this.cellData) return; // 남이 누른 칸을 누르면 중단

            const rootData = this.$root.$data;
            // console.log(rootData); // 최상위의 데이터
            // console.log(this.$parent.$data); // TdComponent의 부모(TrComponent)의 데이터(내가 니 애비다)
            rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn; // 현재 턴을 선택한 칸에 넣는다

            let win = false;
            if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                win = true;
            }
            if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
                win = true;
            }
            if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                win = true;
            }
            if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                win = true;
            }

            if (win) {
                rootData.winner = rootData.turn;

                // 초기화
                rootData.turn = 'O';
                rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            } else { 
                let all = true; // all(9칸이 다 차면)이 true면 무승부
                rootData.tableData.forEach((row) => { // 무승부 검사
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });

                if (all) { // 무승부 확정
                    rootData.winner = '';
                    rootData.turn = 'O';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else {
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; // O -> X -> O -> ...
                }                
            }
        },
    },
}
</script>