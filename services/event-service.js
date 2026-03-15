import EventRepository from "../repository/event-repository.js";
import eventModel from "../model/event-model.js";
import userModel from "../model/user-model.js";
import { isOrganizer } from "../utils/isOrganiser.js";

class EventService {
    constructor() {
        this.eventRepository = new EventRepository();
    }

    async createEvent(data, userId) {
        try {

            const isUserOrganizer = await isOrganizer(userId);
            console.log("isUserOrganizer", isUserOrganizer);
            if (!isUserOrganizer) {
                return null;
            }
            const event = await this.eventRepository.createEvent({ ...data, organizer: userId });
            return event;
        } catch (error) {
            console.log(
                "Something went wrong in event creation in service layer",
                error
            );
            throw error;
        }
    }
    
}

export default EventService;