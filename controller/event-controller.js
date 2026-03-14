import EventService from "../service/event-service.js";
import UserService from "../service/user-service.js";


const eventService=new EventService();
const userService=new UserService();

const createEvent=async (req,res)=>{
    try {
        const userId=req.user.id;
        const event=await eventService.createEvent(req.body,userId);

        if (!event) {
            return res.status(403).json({
              message: 'Sorry, you are not an organizer and cannot create an event.',
            });
          }

        res.status(201).json({
            message:"Event created successfully",
            data:event,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log("Error in event controller",error);
        res.status(500).json({
            message:"Internal server error",
            err:error,
            data:{},
            success:false
        })
    }
}

export {
    createEvent,
    
    
}