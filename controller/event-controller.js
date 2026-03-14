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
const getEvents=async (req,res)=>{
    try {
        const events=await eventService.getEvents();
        res.status(200).json({
            message:"Events fetched successfully",
            data:events,
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
const getEvent=async (req,res)=>{
    try {
        const {id}=req.params;
        const event=await eventService.getEvent(id);
        res.status(200).json({
            message:"Event fetched successfully",
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

const updateEvent=async (req,res)=>{
    try {
        const {id}=req.params;
        const currentUser=req.user;

        const updatedEvent=await eventService.updateEvent(id,req.body,currentUser);
        if(!updatedEvent){
            return res.status(403).json({
                message: 'Sorry, you are not an organizer and cannot update this event.',
              });
        }
        res.status(200).json({
            message:"Event updated successfully",
            data:updatedEvent,
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
    getEvents,
    getEvent,
    updateEvent
    
}