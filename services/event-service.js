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
    async getEvents() {
        try {
            const events = await this.eventRepository.getEvents();
            return events;
        } catch (error) {
            console.log(
                "Something went wrong in event creation in service layer",
                error
            );
            throw error;
        }
    }
    async getEvent(id) {
        try {
            const event = await this.eventRepository.getEvent(id);
            return event;
        } catch (error) {
            console.log(
                "Something went wrong in event creation in service layer",
                error
            );
            throw error;
        }
    }
    async updateEvent(id, data, currentUser) {
        try {
            const event = await this.eventRepository.getEvent(id);

            if (!event) {
                throw new Error("Event not found");
            }

            // Check if the current user is the organizer of the event
            if (event.organizer._id.toString() !== currentUser.id) {
                return null;
                // throw new Error(
                //   "You must be the organizer of the event to make changes"
                // );
            }
            const updatedEvent = await this.eventRepository.updateEvent(id, data);
            return updatedEvent;
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