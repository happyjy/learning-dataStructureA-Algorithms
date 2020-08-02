김정환님의 webpack, eslint/prettier 설정을 적용보자

# open with live server

- explore > index.html에서 옵션에 "open with live server" 클릭 하면 html이 open되고 저장할때마다 변경 사항이 바로 적용된다.

# webpack 설정

https://www.youtube.com/watch?v=rbmUFHZt3sg
https://www.youtube.com/watch?v=HNRt0lODCQM - webpack dev server

## webpack 설정

- js만 함

```
npm init y
```

```
npm i -D webpack webpack-cli
```

- package.json 설정

```
"build": "webpack",
```

- webpack.confing.js 설정

```
const path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  }
}
```

---

# lint, Prettier 설정

https://www.youtube.com/watch?v=Y3kjHM7d3Zo

- 잘 안되서 기존에 사용하던 .prettierrc 파일 가져와서 시작

# lint, prettier

- npm install eslint
- npm install prettier
- npm install eslint-plugin-prettier

- "pre-commit": "echo \"이것은 커밋전에 출력\""

# .eslintrc.js

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
};
```
