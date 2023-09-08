<template>
    <div>
        <!-- class="state" : #screen.state (X) -->
        <!-- v-bind:class="state" : #screen.waiting (O) -->
        <!-- :class로 쓸 수도 있다 -->
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
        <div>
            <div>평균 시간 : {{ }}</div>
            <button @click="onReset">리셋</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            result: [],
            state: 'waiting', // 클래스랑 연결할 것임
            message: '클릭해서 시작하세요.',
        }
    },
    methods: {
        onReset() { },
        onClickScreen() {
            if (this.state === 'waiting') {
                this.state = 'ready';
            } else if (this.state === 'ready') {
                this.state = 'now';
            } else if (this.state === 'now') {
                this.state = 'waiting';
            }
        },
    }
};  
</script>

<!-- !You may need an additional loader to handle the result of these loaders -->
<!-- scoped : 이 CSS는 이 컴포넌트 안에서만 유효합니다 -->
<style scoped> #screen {
     width: 300px;
     height: 200px;
     text-align: center;
     user-select: none;
 }

 #screen.waiting {
     background-color: cornflowerblue;
 }

 #screen.ready {
     background-color: crimson;
     color: white;
 }

 #screen.now {
     background-color: gold;
 }</style>