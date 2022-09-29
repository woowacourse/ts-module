<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/49031e8eef91405f824a0438ac1b0059" width="600">
</p>
<h2 align="middle">Level4 - TypeScript Module</h2>
<p align="middle">마르코</p>
</p>

## 🚀 npm 발행
- 설치
```bash
npm install marco-ts-module
```

- 실행
```tsx
import _ from "marco-ts-module";

_.isNull(null); // true

_.pick({'a': 1, 'b': 2, 'c': 3}, ['a','c']) // {'a':1, 'c':3}
```

https://www.npmjs.com/package/marco-ts-module


## ✍️ 테스트 실행
- 타입 선언 테스트
```bash
npm run test:type
```
- API 테스트
```bash
npm run test:api
```
- 전체(타입선언, API) 테스트
```bash
npm run test:all
```

