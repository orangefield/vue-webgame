<template>
    <div>
       <table-component :table-data="tableData" />
    </div>
</template>

<script>
import TableComponent from './TableComponent';

export default {
    components: { 
        TableComponent,
    },
    data() {
        return {
           tableData: [ // 2차원 배열 : 배열 안에 배열
            ['', '', ''], 
            ['', '', ''], 
            ['', '', ''], 
           ],
        };
    },
    methods: {
       
    },
}; 
</script>

<style></style>