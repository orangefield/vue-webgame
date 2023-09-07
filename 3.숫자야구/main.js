import { createApp } from 'vue';  // package.json의 vue를 쓰겠다
import NumberBaseball from './Numberbaseball';

//new Vue(NumberBaseball).$mount('#root');  // Vue instance
createApp(NumberBaseball).mount('#root');