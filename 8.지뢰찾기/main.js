import { createApp } from 'vue';  // package.json의 vue를 쓰겠다
import MineSweeper from './MineSweeper';
import store from './store';

createApp(MineSweeper)
    .use(store)
    .mount('#root');