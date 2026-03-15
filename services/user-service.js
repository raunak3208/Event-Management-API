import UserRepository from '../repository/user-repository.js';
import { checkUserAccess } from '../utils/authUtils.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async updateUser(id, data) {
    try {
      const user = await this.userRepository.updateUser(id, data);
      return user;
    } catch (error) {
      console.log('Something went wrong in user-service ', error);
      throw error;
    }
  }

  async getUser(currentUser, id) {
    try {
      console.log('currentUser', currentUser.role);
      if (!checkUserAccess(currentUser.id, id, currentUser.role)) {
        throw new Error('Access denied: You can only view your own data or if you are an admin.');
      }

      const response = await this.userRepository.getUser(id);
      return response;
    } catch (error) {
      console.log('Something went wrong in user-service ', error);
      throw error;
    }
  }

 
}

export default UserService;