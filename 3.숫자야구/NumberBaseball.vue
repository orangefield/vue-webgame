<!-- Vue component -->
<template>
    <!-- WordRelay의 template과 같은 역할 -->
    <div>
        <h1>{{ result }}</h1>
        <form v-on:submit="onSubmitForm">
            <input ref="answer" maxlength="4" type="text" v-model="value" />
            <button>입력</button>
        </form>
        <div>시도 : {{}}</div>
    </div>
</template>

<script>
export default { //  Vue.component(~)
    data() {
        return {
            value: '',
            result: '',
        }
    },
    methods: {
        onSubmitForm(e){
            e.preventDefault(e);
        }
    }
};  
</script>

<style></style>