import mongoose from "mongoose";
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'

export class User{
    
    public _id: mongoose.Types.ObjectId

    @prop({required: true, unique:true})
    public userEmail:string;

    @prop({required: true})
    public password:string;

    @prop({required: true})
    public nickname:string;

    @prop()
    public joinDate:string;
    
    // userEmail user 찾기
    public static async findByUserEmail(userEmail:string): Promise<User|null>{
        const userdata: User|null = await UserModel.findOne({userEmail:userEmail}).exec(); //find 한번에 여러개 찾을때, findOne 사용
        console.log(userEmail,' 조회 완료');
        return userdata;
    }
    // user 추가
    public static async saveUser(userEmail: string, password: string, nickname: string): Promise<void> {
        await UserModel.create({ userEmail: userEmail, password: password, nickname:nickname, joinDate:new Date().toISOString() });
        console.log(userEmail,' 추가 완료');

    }
    public static async updateUser(userEmail: string, password: string, nickname: string): Promise<void>{
        await UserModel.updateOne({ userEmail }, { password, nickname});
        console.log(userEmail,'수정 완료');
    }
    public static async deleteUser(userEmail: string): Promise<void>{
        await UserModel.deleteOne({userEmail: userEmail});
        console.log(userEmail,' 삭제 완료');
    }
    //전체 user 목록 
    public static async getAllUsers():Promise<User[]>{
        return await UserModel.find({});
    }
    
}

export const UserModel = getModelForClass(User);