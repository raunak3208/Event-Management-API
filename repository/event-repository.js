import eventModel from "../model/event-model.js";

class EventRepository{
    constructor(){
        this.eventModel = eventModel;
    }

    async createEvent(data){
        try {
            const event=await this.eventModel.create(data);
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async getEvents(){
        try {
            const events=await this.eventModel.find();
            return events;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async getEvent(id){
        try {
            const event=await this.eventModel.findById(id).populate("organizer attendees", "name email");
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async updateEvent(id,data){
        try {
            const event=await this.eventModel.findByIdAndUpdate(id,data,{new:true});
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async deleteEvent(id){
        try {
            const event=await this.eventModel.findByIdAndDelete(id);
            return event;
        } catch (error) {
            console.log('Something went wrong in event repo', error);
            throw error;
        }
    }
    async save(event) {
        return await event.save();
    }
    async getAllEventsWithStats() {
        try {
          const events = await this.eventModel.aggregate([
            {
              $project: {
                name: 1,
                date: 1,
                location: 1,
                capacity: 1,
                organizer: 1,
                registrationsCount: { $size: "$attendees" }, // Count attendees
              },
            },
          ]);
          return events;
        } catch (error) {
          console.error("Error retrieving events with stats:", error);
          throw error;
        }
      }

      async getPopularEvents (){
        try {
           const events=await this.eventModel
           .find({})
           .sort({ "attendees.length": -1 })
           .limit(5)
           .select('name attendees'); 

           return events;
        } catch (error) {
          console.error("Error retrieving popular events:", error);
          throw error;
        }
      };

      async getEventStats(id){
        try {
            const event=await this.eventModel.findById(id).select('name attendees').populate("attendees", "name email");
            return event;
        } catch (error) {
            console.log('Something went wrong while retrieving get event stats in event repo', error);
            throw error;
        }
      }
}

export default EventRepository;