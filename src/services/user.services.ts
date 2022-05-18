import userModel from '../model/user.model';

export default class userServices {

    //create new user
    async createUser(userInput: any) {
        try {
            let user = new userModel(userInput);
            return user;
        } catch (error) {
            return error;
        }
    }

    //get all user data
    async getAllUser() {
        try {
            let user = await userModel.find({}).lean()
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    //get user by id
    async userById(id: any) {
        try {
            let user = await userModel.findById(id)
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    //update by id
    async updateData(id: any, data: any) {
        try {
            let user = await userModel.findByIdAndUpdate(id, data)
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    //delete by id
    async deleteData(id: any) {
        try {
            let user = await userModel.findByIdAndDelete(id)
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    //login
    async getUserByEmail(email: any) {
        try {
            let user = await userModel.findOne({ email })
            return user;
        } catch (error) {
            console.log(error)
        }
    }
}