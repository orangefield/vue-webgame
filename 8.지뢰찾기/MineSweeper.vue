<template>
    <div>
        <mine-form></mine-form> <!-- 지뢰 테이블 설정하는 폼 -->
        <br />
        <div>경과시간 : {{ timer }}</div>
        <table-component></table-component> <!-- 실제 보여질 테이블 -->
        <div>{{ result }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store, { INCREMENT_TIMER } from './store';
import TableComponent from './TableComponent';
import MineForm from './MineForm';

let interval;

export default {
    store,
    components: {
        TableComponent,
        MineForm,
    },
    computed: {
        ...mapState(['timer', 'result', 'halted']),
    },
    methods: {

    },
    watch: { // 통제된 환경에서는 써도 된다
        halted(value, oldValue) {
            if (value === false) { // false : 게임 시작
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER)
                }, 1000);  // js의 타이머는 1초가 진짜 1초가 아닐 수 있다
            } else { // 게임 중단
                clearInterval(interval);
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