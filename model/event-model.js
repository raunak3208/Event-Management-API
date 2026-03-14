import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
}],
});

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;