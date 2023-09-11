<template>
    <td>{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellData: String, // 'O', 'X'
        cellIndex: Number,
        rowIndex: Number,
    }
}
</script>