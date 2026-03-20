import userModel from '../model/user-model.js';

class UserRepository {
  constructor() {
    this.userModel = userModel;
  }

  async updateUser(id, data) {
    try {
      const response = await this.userModel.findOneAndUpdate({ _id: id }, data, { new: true }); // Use _id
      return response;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

  async getUser(id) {
    try {
      const user = await this.userModel.findOne({ _id: id }); // Use _id
      return user;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

  async findAllUsers(query,skip, limit){
    try {
      const users=await this.userModel.find(query).skip(skip).limit(limit).select("-password");
      return users;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

  async deleteUser(id){
    try {
      const user=await this.userModel.findByIdAndUpdate(id,{isDeleted:true,deletedAt:Date.now()},{new:true});
      return user;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

  async countUsers(query) {
    try {
      const count = await this.userModel.countDocuments(query);  // Use countDocuments to get total count
      return count;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }
}

export default UserRepository;