<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <!-- props도 v-bind 가능 -->
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
import LottoBall from './LottoBall';

function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    // console.log(winNumbers);
    // console.log(bonusNumber);

    return [...winNumbers, bonusNumber];
}

const timeouts = []; // clearTimeout 하기 위한 변수

export default {
    components: { // 자식 컴포넌트들을 등록하는 용도
        'lotto-ball': LottoBall, // '등록(template에서 쓸 이름과 같아야 함)': 객체(파스칼케이스로 쓰면 그냥 객체만 적어도 된다)
    },
    data() {
        return {
            winNumbers: getWinNumbers(), // 한번에 로또 숫자를 다 뽑는 용도
            winBalls: [], // 그 숫자들을 차례로 공개하는 용도
            bonus: null,
            redo: false,
        };
    },
    computed: {

    },
    methods: {
        onClickRedo() {
            this.winNumbers = getWinNumbers();
            this.winBalls = [];
            this.bonus = null;
            this.redo = false;

            // this.showBalls();
        },
        showBalls() {
            for (let i = 0; i < this.winNumbers.length - 1; i++) { // let을 쓰면 클로져 문제가 생기지 않는다, 일단 6개만 공개
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i]);
                }, (i + 1) * 1000);
            }
            timeouts[6] = setTimeout(() => {
                this.bonus = this.winNumbers[6]; // 마지막 숫자
                this.redo = true; // 버튼 활성화
            }, 8000);
        },
    },
    mounted() { // 화면에 렌더링 되자마자
        this.showBalls();
    },
    beforeDestroy() {
        timeouts.forEach((t)=>{ // timeouts가 배열
            clearTimeout(t);
        });
    },
    watch: { // 비동기로 변경됨
        bonus(value, oldValue){ // 감시하고자 하는 데이터의 이름을 함수명으로
            console.log(value, oldValue); // winBalls 같은 객체나 배열은 참조 관계라 이전값, 현재값이 같게 나올 수 있다. 
            // 원시값을 watch 하는 것이 좀 더 정확할 것. 더 좋은건 watch를 최대한 쓰지 말자. watch는 최후의 수단
            if(value === null) {
                // console.log(this.winBalls.length)
                this.showBalls();
            }
        }
    },
}; 
</script>

<style scoped></style>