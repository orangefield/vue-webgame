<template>
    <div class="ball" :style="styleObject">
        {{ number }}
    </div>
</template>

<script>
export default {
    name: 'LottoBall', // LottoBall 컴포넌트의 이름
    props: { // 제너레이터(부모 컴포넌트)에서 전달하는 데이터를 props로 받아 볼(자식 컴포넌트)에서 쓸 수 있다 {{ number }}
        // props로 받은 데이터는 다른 것으로 변경할 수 없다(read only)
        // 바꾸고 싶다면 데이터를 바꾸는 부모의 함수를 자식에게 props로 전달
        number: Number, // ['number'] 로 쓸 수도 있다, 변수명: 자바스크립트 자료형
    },
    data() {
        return {

        }
    },
    computed: {
        styleObject() {
            let background;
            if (this.number < 10) {
                background = 'red';
            } else if (this.number <= 20) {
                background = 'orange';
            } else if (this.number <= 30) {
                background = 'yellow';
            } else if (this.number <= 40) {
                background = 'green';
            } else {
                background = 'blue';
            }

            return {
                background,
            };
        }
    },
    methods: {

    },
    mounted() {

    },
    beforeDestroy() {

    },
};  
</script>

<style>
.ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
}
</style>