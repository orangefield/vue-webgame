// webpack.config.js 파일을 직접 생성
const { VueLoaderPlugin } = require('vue-loader');   // !vue-loader was used without the corresponding plugin.
const path = require('path');   // !The output directory as **absolute path**

// entry, module, plugins, output 중요
module.exports = {
    mode: 'development',    // 배포 : 'production'
    devtool: 'eval',        // 배포시에는 'hidden-source-map'
    resolve: {
        extensions: ['.js', '.vue'],    // 확장자 생략 가능
    },
    entry: {    // 엄청 많은 스크립트 중에 가장 대표가 될 파일(app.js : 엄청 많은 스크립트들이 하나로 합쳐지는 파일)
        app: path.join(__dirname, 'main.js'),
    },
    module: {   // 웹팩의 핵심
        rules: [{   // 어떻게 합칠건지
            // !export 'default' (imported as 'Vue' was not found in 'vue')
            test: /\.vue$/,     // .vue 파일들은 웹팩이 아니라 뷰로더가 맡겠다
            use: 'vue-loader',   // use 대신 loader 써도 됨
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'app.js',  // entry의 결과물('[name].js'라 써도 된다)
        path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더
    },
};