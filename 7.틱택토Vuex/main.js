import { createApp } from 'vue';  // package.json의 vue를 쓰겠다
import TicTacToe from './TicTacToe';
import store from './store';

createApp(TicTacToe)
    .use(store)
    .mount('#root');