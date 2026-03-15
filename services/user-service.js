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

  
}

export default UserService;