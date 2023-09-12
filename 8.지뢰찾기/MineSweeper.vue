<template>
    <div>
        <mine-form></mine-form> <!-- 지뢰 테이블 설정하는 폼 -->
        <div>{{ timer }}</div>
        <table-component></table-component> <!-- 실제 보여질 테이블 -->
        <div>{{ result }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from './store';
import TableComponent from './TableComponent';
import MineForm from './MineForm';

export default {
    store,
    components: {
        TableComponent,
        MineForm,
    },
    computed: {
        ...mapState(['timer', 'result']),
    },
    methods: {

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