<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{ result }}</div>
        <div>현재 {{ score }} 점</div>
    </div>
</template>

<script>
const rspCoords = {
    바위: '-110px',
    가위: '-459px',
    보: '-815px'
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};

let interval = null;

export default {
    data() {
        return {
            imgCoord: rspCoords.바위,
            result: '',
            score: 0,
        }
    },
    computed: {
        computedStyleObject() {
            return {
                //background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
                background: `url(../assets/rockScissorsPaper01.png) ${this.imgCoord} 0`,
            }
        }
    },
    methods: {
        changeHand() {
            interval = setInterval(() => {
                if (this.imgCoord === rspCoords.바위) {
                    this.imgCoord = rspCoords.가위;
                } else if (this.imgCoord === rspCoords.가위) {
                    this.imgCoord = rspCoords.보;
                } else if (this.imgCoord === rspCoords.보) {
                    this.imgCoord = rspCoords.바위;
                }
            }, 100); // 0.1초
        },
        onClickButton(choice) {
            clearInterval(interval);    // 잠시 멈춤

            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(this.imgCoord)];
            const diff = myScore - cpuScore;

            if (diff === 0) {
                this.result = '비겼습니다';
            } else if ([-1, 2].includes(diff)) {
                this.result = '이겼습니다';
                this.score += 1;
            } else {
                this.result = '졌습니다';
                this.score -= 1;
            }

            setTimeout(()=>{
                this.changeHand();
            }, 1000);   // 1초 뒤 다시 시작
        },
    },
    /*
    beforeCreate() { console.log('beforeCreate'); },
    created() { console.log('created'); },
    beforeMount() { console.log('beforeMount'); },
    */
    mounted() {
        // console.log('mounted');
        this.changeHand();
    },
    /*
    beforeUpdate() { console.log('beforeUpdate'); },
    updated() { console.log('updated'); },
    */
    beforeDestroy() {
        // console.log('beforeDestroy');
        clearInterval(interval); // 컴포넌트가 사라진 후에도 setInterval()이 계속 실행되는 것을 막기 위해, 메모리 누수를 막기 위해
    },
    /*
    destroyed() { console.log('destroyed'); },
    */
};  
</script>

<style scoped>
#computer {
    width: 360px;
    height: 600px;
    background-position: 0 0;
}
</style>