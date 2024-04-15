import mongoose from "mongoose";
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'

export class User{
    
    public _id: mongoose.Types.ObjectId

    @prop({required: true, unique:true})
    public userEmail:string;

    @prop({required: true})
    public password:string;

    @prop({required: true, unique:true})
    public nickname:string;

    @prop()
    public joinDate:string;
    
    // nickname으로 user 찾기
    public static async findByNickname(nickname:string): Promise<User|null>{
        const userdata: User|null = await UserModel.findOne({nickname:nickname}).exec(); //find 한번에 여러개 찾을때, findOne 사용
        console.log(nickname,' 조회 완료');
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
    public static async deleteByNickname(nickname: string): Promise<void>{
        await UserModel.deleteOne({nickname: nickname});
        console.log(nickname,' 삭제 완료');
    }
    
}

export const UserModel = getModelForClass(User);