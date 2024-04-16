import express, { Request, Response } from 'express';
import { UserModel,User } from '../models/user';

const router = express.Router();
const { userDataValidator, anotherMiddleware } = require('../middleware/userVaildator');
const bcrypt = require('bcrypt');

// 'user'가 아니라 '/' 로 설정해야한다.
router.get('/:userEmail',async(req:Request,res:Response)=>{
    try{
        const userEmail:string = req.params.userEmail;
        const userdata: User|null = await UserModel.findByUserEmail(userEmail);
        res.status(200).json({ data:userdata ,message: '데이터 조회 성공' });
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ message: '데이터 조회 실패' });
    }
})
//회원가입
router.post('/', userDataValidator, async (req: Request, res: Response) => {
    try {
        const { userEmail, password, nickname } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // salt 값 일반적으로 10
        await UserModel.saveUser(userEmail,hashedPassword,nickname);
        res.status(201).json({ message: '데이터 추가 성공' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: '데이터 추가 실패' });
    }
});
//user 수정
router.put('/',async(req:Request,res:Response)=>{
    try{
        const { userEmail, password, nickname } = req.body;
        await UserModel.updateUser(userEmail,password,nickname);
        res.status(201).json({ message: '데이터 수정 성공' });
    }catch(error){
        console.error('Error updating user:', error);
        res.status(500).json({ message: '데이터 수정 실패' });
    }
});
//user 삭제
router.delete('/',async(req:Request,res:Response)=>{
    try{
        const {nickname} = req.body;
        await UserModel.deleteUser(nickname);
        res.status(200).json({ message: '데이터 삭제 성공' });
    }catch(error){
        console.error('Error deleting user:', error);
        res.status(500).json({ message: '데이터 삭제 실패' });
    }
});

// 세션 로그인
router.post('/session/login',async(req:Request,res:Response)=>{
    try{
        const {userEmail,password} = req.body;
        const userdata:User|null = await UserModel.findByUserEmail(userEmail);

        //존재하지 않는 사용자
        if (!userdata) {
            return res.status(400).json({ message: '이메일을 다시 확인해주세요.' });
        }

        const passwordMatch = await bcrypt.compare(password,userdata.password);
        if(passwordMatch){
            req.session.user = {
                userEmail: userEmail,
                nickname: userdata.nickname,
                loginTime: new Date().toISOString(),
                authorized: true,
            };
            console.log(userEmail,' 로그인');
            console.log(req.session.user.userEmail);
            res.status(201).json({ session:req.session.user });
        }else{
            res.status(400).json({ message: '비밀번호를 다시 확인해주세요.' });
        }
    }catch(error){
        console.error('session login error :', error);
        res.status(500).json({ message: '로그인 오류' });
    }
});
// 세션 로그아웃
router.get('/session/logout',(req:Request,res:Response)=>{
    try{
        req.session.destroy(()=>{
            const userEmail = req.session?.user?.userEmail;
            console.log(userEmail,' 로그아웃');
            res.status(200).json({ message:`${userEmail} 로그아웃` });
        });
    }catch(error){
        console.error('session logout error:', error);
        res.status(500).json({ message: '로그아웃 오류' });
    }
})






export default router;