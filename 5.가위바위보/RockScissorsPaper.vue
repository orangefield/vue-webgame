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
        onClickButton(choice) { },
    }
};  
</script>

<style scoped>
#computer {
    width: 360px;
    height: 600px;
    background-position: 0 0;
}
</style>