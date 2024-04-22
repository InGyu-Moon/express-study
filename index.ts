import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session'
import userRouter from './src/controllers/user';

const app = express()
const port = 3000

//jsx가 뭔지
// cors 에러 해결하기


declare module 'express-session' {
  interface SessionData {
    user?: {
      userEmail: string;
      nickname: string;
      loginTime: string;
      authorized: boolean;
    };
  }
}

app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
mongoose.connect('mongodb+srv://root:1234@cluster0.1pwaaf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('success');
})