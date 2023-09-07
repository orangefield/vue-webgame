// webpack.config.js 파일을 직접 생성
// entry, module, plugins, output 중요
module.exports = {
    entry: {    // 엄청 많은 스크립트 중에 가장 대표가 될 파일(app.js : 엄청 많은 스크립트들이 하나로 합쳐지는 파일)
        app: './main.js',
    },
    module: {   // 웹팩의 핵심
        rules: [{   // 어떻게 합칠건지

        }],
    },
    plugins: [],
    output: {
        filename: 'app.js',  // entry의 결과물('[name].js'라 써도 된다)
        path: './dist',     // /dist/app.js 가 됨
    },
};