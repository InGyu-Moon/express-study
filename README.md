## 시작하기
```bash
# 시작
yarn init

yarn add express
yarn add @types/express (--dev)
yarn add typescript (--dev)
yarn add ts-node (--dev)
yarn add mongoose
yarn add @typegoose/typegoose
yarn add ts-node

#한번에
yarn add express @types/express typescript ts-node mongoose @typegoose/typegoose

# 실행
yarn ts-node index.ts 
nodemon index.ts
```
## tsconfig.json 추가하기

## session 추가
```bash
npm install express-session
```
### 오류발생
package.json에서 mongoose": "^8.3.1" 에서 "mongoose": "^8.2.4"로 버전 변경