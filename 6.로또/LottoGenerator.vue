<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus"></lotto-ball>
        <button v-if="redo">한 번 더!</button>
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

    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {

    },
}; 
</script>

<style scoped></style>