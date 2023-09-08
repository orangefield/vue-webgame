<template>
    <!-- 그냥 감싸주는 용도의 div는 아래와 같이 template을 써서 대신 감싸줘도 되지만, 템플릿 '바로' 안은 template으로 감싸지 못한다 -->
    <div>
        <!-- class="state" : #screen.state (X) -->
        <!-- v-bind:class="state" : #screen.waiting (O) -->
        <!-- :class로 쓸 수도 있다 -->
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
        <!--<div v-show="result.length"> 태그가 있고, 눈에 안보이게 처리된다 -->
        <template v-if="result.length"> <!-- 아예 태그 자체가 존재하지 않는다 -->
            <!-- reduce() : 배열의 합 -->
            <!-- || 0 : 기본값이 0 -->
            <div>평균 시간 : {{ average }}ms</div>
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
    data() {
        return {
            result: [],
            state: 'waiting', // 클래스랑 연결할 것임
            message: '클릭해서 시작하세요.',
        }
    },
    computed: {
        // computed : 데이터를 가공해서 쓸 때 이용, 값이 캐싱된다(message만 바뀌고 result는 안바뀌었을 때 캐싱된 결과가 다시 사용된다. 좋다!)
        average() {
            return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
        }
    },
    methods: {
        onReset() {
            this.result = []; // 초기화
        },
        onClickScreen() {
            if (this.state === 'waiting') {
                this.state = 'ready';
                this.message = '노란색이 되면 클릭하세요';

                timeout = setTimeout(() => {
                    this.state = 'now';
                    this.message = '지금 클릭!';

                    startTime = new Date();
                }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
            } else if (this.state === 'ready') {
                clearTimeout(timeout);

                this.state = 'waiting';
                this.message = '너무 성급하시군요! 노란색이 된 후에 클릭하세요';
            } else if (this.state === 'now') {
                endTime = new Date();

                this.state = 'waiting';
                this.message = '클릭해서 시작하세요';

                this.result.push(endTime - startTime);
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
 }
</style>