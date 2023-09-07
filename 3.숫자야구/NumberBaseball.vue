<!-- Vue component -->
<template>
    <!-- WordRelay의 template과 같은 역할 -->
    <div>
        <h1>{{ result }}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" type="text" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도 : {{ tries.length }}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{ t.try }}</div>
                <div>{{ t.result }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default { //  Vue.component(~)
    data() {
        return {
            tries: [],
            value: '',
            result: '',
        }
    },
    methods: {
        onSubmitForm(e) {
            // e.preventDefault(e);

            this.tries.push({   // push() 내부에 객체(t)를 넣음
                try: this.value,
                result: '홈런',
            });    // 1. 입력할 때마다 tries에 추가하기
            this.value = '';
            this.$refs.answer.focus();
        }
    }
};  
</script>

<style></style>