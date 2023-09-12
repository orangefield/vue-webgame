<template>
    <div>
        <input type="number" placeholder="세로" :value="row" @change="onChangeRow" />
        <input type="number" placeholder="가로" :value="cell" @change="onChangeCell" />
        <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine" />
        <button @click="onClickBtn">시작</button>
    </div>
</template>

<script>
import { START_GAME } from './store';

export default { // 이 컴포넌트에서만 쓰는 데이터는 지역적으로 만들어도 좋다
    data() {
        return {
            row: 10,
            cell: 10,
            mine: 20,
        }
    },
    methods: {
        onChangeRow(e) {
            this.row = e.target.value;
        },
        onChangeCell(e) {
            this.cell = e.target.value;
        },
        onchangeMine(e) {
            this.mine = e.target.value;
        },
        onClickBtn() { // 바뀐 데이터들을 Vuex에 보내준다
            this.$store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine });
        }
    }
}
</script>