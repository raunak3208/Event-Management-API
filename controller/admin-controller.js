import UserService from "../service/user-service.js";
import EventService from "../service/event-service.js";

const userService = new UserService();
const eventService = new EventService();


const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const result = await userService.getAllUsers({ isDeleted: false }, +page, +limit);
    // console.log("result",result)
    // console.log("users",users);
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.users,
      pagination: {                   // Add pagination metadata
        totalUsers: result.totalUsers,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
      }
    });
  } catch (error) {
    console.error("Error in AdminController while fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await eventService.getEventsWithStats();
    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error in AdminController while fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in AdminController while deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

export { getUsers, getEvents, deleteUser };