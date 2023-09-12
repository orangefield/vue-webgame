<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
import TdComponent from './TdComponent';

export default {
    components: {
        TdComponent,
    },
    props: {
        rowIndex: Number,
    },
    computed: {
        rowData(){
            return this.$store.state.tableData[this.rowIndex];
        },
    },
    data() {
        return {
            parent: '내가 니 애비다',
        }
    }
}
</script>

